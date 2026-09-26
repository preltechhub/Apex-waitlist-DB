import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";
import waitlistRouter from "./modules/waitlist/waitlist.routes.js";
import verificationRouter from "./modules/verification/verification.routes.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: env.frontendUrl,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(express.json({ limit: "16kb" }));

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "APEX backend is healthy.",
  });
});

app.use("/api/v1/waitlist", waitlistRouter);

app.use("/api/v1/waitlist", verificationRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
