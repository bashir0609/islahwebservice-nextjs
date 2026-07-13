import { describe, it, expect, vi, beforeEach } from "vitest";

const sendEmailToAdmin = vi.fn();

vi.mock("./settings", () => ({
  sendEmailToAdmin: (...args: unknown[]) => sendEmailToAdmin(...args),
}));

import { submitContactForm } from "./contact";

const validData = {
  name: "Jane Doe",
  email: "jane@example.com",
  company: "Acme Inc",
  service: "lead-generation",
  message: "I would like to learn more about your services.",
};

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates and forwards valid data to sendEmailToAdmin", async () => {
    sendEmailToAdmin.mockResolvedValue({ success: true, emailId: "abc" });

    const result = await submitContactForm(validData);

    expect(result).toEqual({ success: true, message: "Message sent successfully!" });
    expect(sendEmailToAdmin).toHaveBeenCalledWith(validData);
  });

  it("rejects an invalid email with the schema message", async () => {
    await expect(
      submitContactForm({ ...validData, email: "not-an-email" })
    ).rejects.toThrow("Please enter a valid email address");
    expect(sendEmailToAdmin).not.toHaveBeenCalled();
  });

  it("rejects a too-short name", async () => {
    await expect(
      submitContactForm({ ...validData, name: "J" })
    ).rejects.toThrow("Name must be at least 2 characters");
  });

  it("rejects a missing service selection", async () => {
    await expect(
      submitContactForm({ ...validData, service: "" })
    ).rejects.toThrow("Please select a service");
  });

  it("rejects a too-short message", async () => {
    await expect(
      submitContactForm({ ...validData, message: "short" })
    ).rejects.toThrow("Message must be at least 10 characters");
  });

  it("aggregates multiple validation errors into one message", async () => {
    await expect(
      submitContactForm({
        name: "J",
        email: "bad",
        company: "A",
        service: "",
        message: "no",
      })
    ).rejects.toThrow(/,/);
    expect(sendEmailToAdmin).not.toHaveBeenCalled();
  });

  it("propagates errors thrown by sendEmailToAdmin", async () => {
    sendEmailToAdmin.mockRejectedValue(new Error("Email service error: boom"));

    await expect(submitContactForm(validData)).rejects.toThrow(
      "Email service error: boom"
    );
  });
});
