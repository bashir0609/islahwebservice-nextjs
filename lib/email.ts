import { Resend } from "resend";

export interface ResendConfig {
  apiKey?: string;
  fromEmail?: string;
  toEmail?: string;
}

export function getResendConfig(): ResendConfig {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.FROM_EMAIL,
    toEmail: process.env.TO_EMAIL,
  };
}

export async function sendEmail(params: {
  apiKey: string;
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { apiKey, from, to, subject, html, replyTo } = params;
  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
