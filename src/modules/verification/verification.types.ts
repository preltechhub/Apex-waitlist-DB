export interface VerificationChallenge {
  token: string;
  tokenHash: string;
  expiresAt: Date;
}
