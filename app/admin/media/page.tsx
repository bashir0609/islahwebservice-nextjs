"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Trash2, ExternalLink, ImageOff, Search } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type CloudinaryImage = {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  bytes: number;
  createdAt: string;
};

export default function AdminMediaPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);
  const [editingImage, setEditingImage] = useState<CloudinaryImage | null>(null);
  const [editPublicId, setEditPublicId] = useState("");
  const [newFolder, setNewFolder] = useState("islahwebservice");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const loadImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/cloudinary?action=list&folder=${encodeURIComponent(newFolder)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load images");
      setImages(data.images || []);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load images",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [newFolder]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast({ title: "Error", description: "Select a file first", variant: "error" });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", newFolder);

      const res = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      toast({ title: "Image uploaded" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      loadImages();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Upload failed",
        variant: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: CloudinaryImage) => {
    if (!confirm(`Delete "${image.publicId}"?`)) return;
    try {
      const res = await fetch("/api/admin/cloudinary", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: image.publicId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      toast({ title: "Image deleted" });
      setSelectedImage(null);
      loadImages();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Delete failed",
        variant: "error",
      });
    }
  };

  const handleMove = async () => {
    if (!editingImage || !editPublicId.trim()) return;
    try {
      const res = await fetch("/api/admin/cloudinary", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicId: editingImage.publicId,
          newPublicId: editPublicId.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Move failed");

      toast({ title: "Image moved" });
      setEditingImage(null);
      setEditPublicId("");
      loadImages();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Move failed",
        variant: "error",
      });
    }
  };

  const filteredImages = images.filter((img) => {
    const term = searchTerm.toLowerCase();
    return (
      img.publicId.toLowerCase().includes(term) ||
      img.url.toLowerCase().includes(term) ||
      img.format.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500 mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Media Library
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Upload, manage, and organize images with Cloudinary
        </p>
      </div>

      {/* Upload */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <SectionReveal>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Upload Image
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Folder</label>
                <Input
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  placeholder="islahwebservice"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">File</label>
                <Input ref={fileInputRef} type="file" accept="image/*" />
              </div>
            </div>
            <Button type="submit" disabled={uploading} className="bg-cyan-600 hover:bg-cyan-700">
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </SectionReveal>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images by name, URL, or format..."
          className="pl-10"
        />
      </div>

      {/* Gallery */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : filteredImages.length === 0 ? (
          <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
            <ImageOff className="h-8 w-8" />
            <span>No images found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.publicId}
                className="group relative aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.publicId}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingImage(image);
                      setEditPublicId(image.publicId);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(image.url, "_blank");
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(image);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white break-all">
                {selectedImage.publicId}
              </h3>
              <Button variant="outline" onClick={() => setSelectedImage(null)}>
                Close
              </Button>
            </div>
            <img
              src={selectedImage.url}
              alt={selectedImage.publicId}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="p-4 text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <p>Format: {selectedImage.format}</p>
              <p>Dimensions: {selectedImage.width} x {selectedImage.height}</p>
              <p>Size: {(selectedImage.bytes / 1024).toFixed(1)} KB</p>
              <p>Created: {new Date(selectedImage.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Move Modal */}
      {editingImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setEditingImage(null);
            setEditPublicId("");
          }}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Edit / Move Image
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 break-all">
              Current path: {editingImage.publicId}
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">New public ID / path</label>
              <Input
                value={editPublicId}
                onChange={(e) => setEditPublicId(e.target.value)}
                placeholder="folder/new-name"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingImage(null);
                  setEditPublicId("");
                }}
              >
                Cancel
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleMove}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
