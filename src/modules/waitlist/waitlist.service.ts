import { ConflictError } from "../../utils/api-error.js";
import { createVerificationChallenge } from "../verification/verification.service.js";
import type { CreateWaitlistSchemaInput } from "./waitlist.schema.js";
import { WaitlistModel } from "./waitlist.model.js";

export async function createWaitlistEntry(input: CreateWaitlistSchemaInput) {
  const email = input.email.trim().toLowerCase();

  const existingUser = await WaitlistModel.findOne({
    email,
  }).lean();

  if (existingUser) {
    throw new ConflictError("Unable to process this request.");
  }

  const verificationChallenge = createVerificationChallenge();

  try {
    const waitlistUser = await WaitlistModel.create({
      email,

      firstName: input.firstName.trim(),

      lastName: input.lastName.trim(),

      phoneNumber: input.phoneNumber.trim(),

      location: {
        city: input.city.trim(),

        stateRegion: input.stateRegion.trim(),

        country: input.country.trim(),
      },

      audienceType: input.audienceType,

      primaryDevice: {
        type: input.primaryDeviceType,

        brandModel: input.primaryDeviceBrandModel?.trim(),

        age: input.deviceAge || undefined,
      },

      research: {
        topNeed: input.topNeed,

        biggestPainPoint: input.biggestPainPoint,

        trustFactor: input.trustFactor,

        previousSellSwap: input.previousSellSwap,

        discoveryNote: input.discoveryNote?.trim(),
      },

      consent: {
        marketing: input.marketingConsent,

        termsAccepted: input.termsAccepted,

        termsAcceptedAt: new Date(),
      },

      status: "pending",

      verification: {
        tokenHash: verificationChallenge.tokenHash,

        expiresAt: verificationChallenge.expiresAt,
      },
    });

    /*
     * The raw verification token is intentionally returned
     * only inside the backend service result.
     *
     * It is NOT returned by the controller response.
     *
     * The upcoming email service will consume this token
     * to build the verification link.
     */
    return {
      waitlistUser,
      verificationToken: verificationChallenge.token,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new ConflictError("Unable to process this request.");
    }

    throw error;
  }
}
