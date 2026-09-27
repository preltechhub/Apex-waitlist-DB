import type { Request, Response } from "express";
import { createWaitlistSchema } from "./waitlist.schema.js";
import { createWaitlistEntry } from "./waitlist.service.js";
import { sendVerificationEmail } from "../email/email.service.js";

export async function createWaitlistController(
  req: Request,
  res: Response,
): Promise<void> {
  const input = createWaitlistSchema.parse(req.body);

  await createWaitlistEntry(input);
  await sendVerificationEmail("empero.lehnzy42@gmail.com");

  res.status(201).json({
    success: true,
    message: "Your APEX early-access request has been received.",
  });
}
