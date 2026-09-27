export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  idempotencyKey?: string;
}

export interface EmailDeliveryResult {
  messageId: string;
}

export interface VerificationEmailTemplateInput {
  firstName: string;
  email: string;
  verificationUrl: string;
  expiresInMinutes: number;
}
