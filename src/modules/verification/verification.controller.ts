import type { Request, Response } from "express";
import { z } from "zod";
import { verifyWaitlistEmail } from "./verification.service.js";

const verificationBodySchema = z.object({
  token: z
    .string()
    .trim()
    .min(1, "Verification token is required.")
    .max(128, "Verification token is invalid."),
});

export async function verifyWaitlistEmailController(
  req: Request,
  res: Response,
): Promise<void> {
  const { token } = verificationBodySchema.parse(req.body);

  await verifyWaitlistEmail(token);

  res.status(200).json({
    success: true,
    message: "Your email has been verified successfully.",
  });
}
