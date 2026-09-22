import { z } from "zod";
import {
  AUDIENCE_TYPES,
  DEVICE_AGES,
  DEVICE_TYPES,
  PAIN_POINTS,
  TOP_NEEDS,
  TRUST_FACTORS,
} from "./waitlist.types.js";

export const createWaitlistSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(80, "First name is too long."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(80, "Last name is too long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("A valid email address is required.")
    .max(254, "Email address is too long."),

  phoneNumber: z
    .string()
    .trim()
    .min(7, "A valid phone number is required.")
    .max(30, "Phone number is too long."),

  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(100, "City is too long."),

  stateRegion: z
    .string()
    .trim()
    .min(1, "State or region is required.")
    .max(100, "State or region is too long."),

  country: z
    .string()
    .trim()
    .min(1, "Country is required.")
    .max(100, "Country is too long."),

  audienceType: z.enum(AUDIENCE_TYPES),

  primaryDeviceType: z.enum(DEVICE_TYPES),

  primaryDeviceBrandModel: z
    .string()
    .trim()
    .max(150, "Device brand/model is too long.")
    .optional()
    .transform((value) => value || undefined),

  deviceAge: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(DEVICE_AGES).optional(),
  ),

  topNeed: z.enum(TOP_NEEDS),

  biggestPainPoint: z.enum(PAIN_POINTS),

  trustFactor: z.enum(TRUST_FACTORS),

  previousSellSwap: z.boolean(),

  discoveryNote: z
    .string()
    .trim()
    .max(2000, "Discovery note is too long.")
    .optional()
    .transform((value) => value || undefined),

  marketingConsent: z.boolean(),

  termsAccepted: z.boolean().refine((value) => value === true, {
    message: "Terms acceptance is required.",
  }),
});

export type CreateWaitlistSchemaInput = z.infer<typeof createWaitlistSchema>;
