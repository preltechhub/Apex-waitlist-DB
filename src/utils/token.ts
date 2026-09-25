import { randomBytes } from "node:crypto";

const VERIFICATION_TOKEN_BYTES = 32;

export function generateVerificationToken(): string {
  return randomBytes(VERIFICATION_TOKEN_BYTES).toString("hex");
}
