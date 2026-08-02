"use client";

import { motion } from "framer-motion";

// Template re-mounts on every client-side navigation, giving each page a
// subtle rise transition that ties the whole site together.
//
// IMPORTANT (LCP): the initial state stays fully visible (opacity: 1). If this
// started at opacity: 0, every page — including the hero — would ship invisible
// in the server HTML and only appear after JS downloads + hydration, which is
// the classic FCP-fast / LCP-slow mismatch (Lighthouse showed 0.9s vs 4.0s on
// mobile Slow 4G). A transform-only rise keeps the transition feel without
// delaying the largest contentful paint.
export default function SiteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
