export interface VerificationChallenge {
  token: string;
  tokenHash: string;
  expiresAt: Date;
}

export interface VerifyWaitlistInput {
  token: string;
}
