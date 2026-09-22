import { Schema, model, type InferSchemaType } from "mongoose";

import {
  AUDIENCE_TYPES,
  DEVICE_AGES,
  DEVICE_TYPES,
  PAIN_POINTS,
  TOP_NEEDS,
  TRUST_FACTORS,
  WAITLIST_STATUSES,
} from "./waitlist.types.js";

const waitlistSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    location: {
      city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      stateRegion: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      country: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
    },

    audienceType: {
      type: String,
      enum: [...AUDIENCE_TYPES],
      required: true,
    },

    primaryDevice: {
      type: {
        type: String,
        enum: [...DEVICE_TYPES],
        required: true,
      },

      brandModel: {
        type: String,
        trim: true,
        maxlength: 150,
      },

      age: {
        type: String,
        enum: [...DEVICE_AGES],
        trim: true,
      },
    },

    research: {
      topNeed: {
        type: String,
        enum: [...TOP_NEEDS],
        required: true,
      },

      biggestPainPoint: {
        type: String,
        enum: [...PAIN_POINTS],
        required: true,
      },

      trustFactor: {
        type: String,
        enum: [...TRUST_FACTORS],
        required: true,
      },

      previousSellSwap: {
        type: Boolean,
        required: true,
      },

      discoveryNote: {
        type: String,
        trim: true,
        maxlength: 2000,
      },
    },

    consent: {
      marketing: {
        type: Boolean,
        required: true,
        default: false,
      },

      termsAccepted: {
        type: Boolean,
        required: true,
      },

      termsAcceptedAt: {
        type: Date,
        required: true,
      },
    },

    status: {
      type: String,
      enum: [...WAITLIST_STATUSES],
      required: true,
      default: "pending",
      index: true,
    },

    verification: {
      tokenHash: {
        type: String,
        select: false,
      },

      expiresAt: {
        type: Date,
        select: false,
      },

      verifiedAt: {
        type: Date,
      },
    },

    source: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    campaign: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Enforce unique email addresses at the database index level.
 *
 * This is intentionally defined once here instead of using
 * `unique: true` inside the email field as well.
 */
waitlistSchema.index({ email: 1 }, { unique: true });

export type WaitlistDocument = InferSchemaType<typeof waitlistSchema>;

export const WaitlistModel = model("WaitlistUser", waitlistSchema);
