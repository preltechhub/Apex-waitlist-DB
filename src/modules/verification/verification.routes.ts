import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { verificationRateLimiter } from "../../middlewares/rate-limit.middleware.js";
import { verifyWaitlistEmailController } from "./verification.controller.js";

const verificationRouter = Router();

verificationRouter.post(
  "/verify",
  verificationRateLimiter,
  asyncHandler(verifyWaitlistEmailController),
);

export default verificationRouter;
