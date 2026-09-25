import "dotenv/config";

const port = Number(process.env.PORT ?? 5000);

const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

const mongodbUri = process.env.MONGODB_URI;

const verificationTokenExpiresMinutes = Number(
  process.env.VERIFICATION_TOKEN_EXPIRES_MINUTES ?? 30,
);

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",

  port,

  frontendUrl,

  mongodbUri,

  verificationTokenExpiresMinutes,
} as const;
