"use server";

import { z } from "zod";
import { sendEmailToAdmin } from "./settings";

const sampleRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().optional(),
  industry: z.string().optional(),
  targetGeography: z.string().optional(),
  companySize: z.string().optional(),
  targetCompanyCriteria: z.string().optional(),
  technologies: z.string().optional(),
  fundingRequirements: z.string().optional(),
  hiringCriteria: z.string().optional(),
  decisionMakerRoles: z.string().optional(),
  requiredFields: z.string().optional(),
  projectSize: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type SampleRequestData = z.infer<typeof sampleRequestSchema>;

// Field labels used to render the email (mirrors the form order).
const FIELD_LABELS: Record<string, string> = {
  website: "Website",
  industry: "Industry / Target vertical",
  targetGeography: "Target geography",
  companySize: "Company size",
  targetCompanyCriteria: "Target company criteria",
  technologies: "Technologies used",
  fundingRequirements: "Funding requirements",
  hiringCriteria: "Hiring criteria",
  decisionMakerRoles: "Desired decision-maker roles",
  requiredFields: "Required data fields",
  projectSize: "Approximate project size",
  additionalNotes: "Additional notes",
};

function buildMessage(data: SampleRequestData): string {
  const sections: string[] = [];

  if (data.targetCompanyCriteria) sections.push(`TARGET COMPANY CRITERIA:\n${data.targetCompanyCriteria}`);
  if (data.industry) sections.push(`INDUSTRY: ${data.industry}`);
  if (data.targetGeography) sections.push(`GEOGRAPHY: ${data.targetGeography}`);
  if (data.companySize) sections.push(`COMPANY SIZE: ${data.companySize}`);
  if (data.technologies) sections.push(`TECHNOLOGIES: ${data.technologies}`);
  if (data.fundingRequirements) sections.push(`FUNDING REQUIREMENTS: ${data.fundingRequirements}`);
  if (data.hiringCriteria) sections.push(`HIRING CRITERIA: ${data.hiringCriteria}`);
  if (data.decisionMakerRoles) sections.push(`DECISION-MAKER ROLES: ${data.decisionMakerRoles}`);
  if (data.requiredFields) sections.push(`REQUIRED FIELDS: ${data.requiredFields}`);
  if (data.projectSize) sections.push(`PROJECT SIZE: ${data.projectSize}`);
  if (data.website) sections.push(`WEBSITE: ${data.website}`);
  if (data.additionalNotes) sections.push(`ADDITIONAL NOTES:\n${data.additionalNotes}`);

  if (sections.length === 0) {
    sections.push("No targeting criteria provided yet — follow up to refine the sample request.");
  }

  return sections.join("\n\n");
}

export async function submitSampleRequest(data: SampleRequestData) {
  try {
    const validated = sampleRequestSchema.parse(data);
    const message = buildMessage(validated);

    const result = await sendEmailToAdmin({
      name: validated.name,
      email: validated.email,
      company: validated.company,
      service: "Free Prospect Research Sample",
      message,
    });

    return { success: true, message: "Sample request received! We'll prepare a small sample for your criteria." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((err) => err.message).join(", "));
    }
    const message = error instanceof Error ? error.message : "Failed to process your request";
    throw new Error(message);
  }
}
