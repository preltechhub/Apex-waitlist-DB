export const AUDIENCE_TYPES = [
  "gadget_owner",
  "gadget_repairer",
  "technology_professional",
  "business_org",
  "developer",
  "other",
] as const;

export type AudienceType = (typeof AUDIENCE_TYPES)[number];

export const DEVICE_TYPES = [
  "phone",
  "laptop",
  "tablet",
  "wearable",
  "multiple",
] as const;

export type DeviceType = (typeof DEVICE_TYPES)[number];

export const DEVICE_AGES = [
  "<1_year",
  "1-2_years",
  "3+_years",
  "not_sure",
] as const;

export type DeviceAge = (typeof DEVICE_AGES)[number];

export const TOP_NEEDS = [
  "know_device_value",
  "check_condition",
  "verify_imei",
  "check_blacklist",
  "repair_sell_swap_upgrade",
  "compare_devices",
] as const;

export type TopNeed = (typeof TOP_NEEDS)[number];

export const PAIN_POINTS = [
  "uncertain_resale_price",
  "hidden_damage",
  "blocked_or_stolen_device",
  "repair_uncertainty",
  "upgrade_timing",
  "information_spread",
] as const;

export type PainPoint = (typeof PAIN_POINTS)[number];

export const TRUST_FACTORS = [
  "clear_explanation",
  "independent_checks",
  "accurate_market_data",
  "verified_service_information",
  "confidence_score",
] as const;

export type TrustFactor = (typeof TRUST_FACTORS)[number];

export const WAITLIST_STATUSES = ["pending", "verified"] as const;

export type WaitlistStatus = (typeof WAITLIST_STATUSES)[number];

export interface CreateWaitlistInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  city: string;
  stateRegion: string;
  country: string;

  audienceType: AudienceType;
  primaryDeviceType: DeviceType;
  primaryDeviceBrandModel?: string;
  deviceAge?: DeviceAge;

  topNeed: TopNeed;
  biggestPainPoint: PainPoint;
  trustFactor: TrustFactor;
  previousSellSwap: boolean;

  discoveryNote?: string;

  marketingConsent: boolean;
  termsAccepted: boolean;
}

export interface WaitlistPublicResponse {
  success: true;
  message: string;
}
