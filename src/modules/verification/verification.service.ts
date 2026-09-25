import { BadRequestError } from "../../utils/api-error.js";
import { hashToken } from "../../utils/hash.js";
import { generateVerificationToken } from "../../utils/token.js";
import { env } from "../../config/env.js";
import { WaitlistModel } from "../waitlist/waitlist.model.js";
import type { VerificationChallenge } from "./verification.types.js";

export function createVerificationChallenge(): VerificationChallenge {
  const token = generateVerificationToken();

  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() + env.verificationTokenExpiresMinutes * 60 * 1000,
  );

  return {
    token,
    tokenHash,
    expiresAt,
  };
}

export async function verifyWaitlistEmail(token: string): Promise<void> {
  const tokenHash = hashToken(token);

  const waitlistUser = await WaitlistModel.findOne({
    status: "pending",
    "verification.tokenHash": tokenHash,
  })
    .select("+verification.tokenHash +verification.expiresAt")
    .lean();

  if (!waitlistUser) {
    throw new BadRequestError("Invalid or expired verification link.");
  }

  const now = new Date();

  if (
    !waitlistUser.verification?.expiresAt ||
    waitlistUser.verification.expiresAt <= now
  ) {
    throw new BadRequestError("Invalid or expired verification link.");
  }

  /*
   * Perform the actual verification atomically.
   *
   * The update only succeeds if:
   * - the user is still pending
   * - the same token hash is still present
   * - the token has not expired
   *
   * We also remove the token immediately after successful use.
   */
  const verifiedUser = await WaitlistModel.findOneAndUpdate(
    {
      _id: waitlistUser._id,
      status: "pending",
      "verification.tokenHash": tokenHash,
      "verification.expiresAt": {
        $gt: now,
      },
    },
    {
      $set: {
        status: "verified",
        "verification.verifiedAt": now,
      },
      $unset: {
        "verification.tokenHash": 1,
        "verification.expiresAt": 1,
      },
    },
    {
      new: true,
    },
  );

  if (!verifiedUser) {
    throw new BadRequestError("Invalid or expired verification link.");
  }
}
