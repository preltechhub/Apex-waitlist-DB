import { Resend } from "resend";

import { env } from "../../config/env.js";
import type {
  EmailDeliveryResult,
  EmailMessage,
  VerificationEmailTemplateInput,
} from "./email.types.js";

import { buildVerificationEmail } from "./templates/verification.template.js";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!env.resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!resendClient) {
    resendClient = new Resend(env.resendApiKey);
  }

  return resendClient;
}

export async function sendEmail(
  message: EmailMessage,
): Promise<EmailDeliveryResult> {
  if (!env.emailFrom) {
    throw new Error("EMAIL_FROM is not configured.");
  }

  const resend = getResendClient();

  const { data, error } = await resend.emails.send(
    {
      from: env.emailFrom,
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
    },
    message.idempotencyKey
      ? {
          idempotencyKey: message.idempotencyKey,
        }
      : undefined,
  );

  if (error || !data?.id) {
    console.error("Email provider rejected email delivery.", {
      error,
    });

    throw new Error("Email delivery failed.");
  }

  return {
    messageId: data.id,
  };
}

export async function sendVerificationEmail(
  req: any,
  res: any,
  input: VerificationEmailTemplateInput,
  email: string,
  idempotencyKey: string,
): Promise<any> {
  const { html, subject, text } = res.body();
  return sendEmail({
    to: input.to,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}
