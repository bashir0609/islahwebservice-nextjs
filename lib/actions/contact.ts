"use server";

import { z } from "zod";
import { sendEmailToAdmin } from "./settings";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data);
    const result = await sendEmailToAdmin(validatedData);
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map(err => err.message).join(", "));
    }
    const message = error instanceof Error ? error.message : "Failed to process your request";
    throw new Error(message);
  }
}
