import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { createWaitlistController } from "./waitlist.controller.js";

const waitlistRouter = Router();

waitlistRouter.post("/", asyncHandler(createWaitlistController));

export default waitlistRouter;
