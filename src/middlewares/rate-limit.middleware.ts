import rateLimit from "express-rate-limit";

export const waitlistRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    code: "RATE_LIMITED",
    message: "Too many waitlist requests. Please try again later.",
  },
});

export const verificationRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    code: "RATE_LIMITED",
    message: "Too many verification attempts. Please try again later.",
  },
});
