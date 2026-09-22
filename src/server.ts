import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`APEX backend running on http://localhost:${env.port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start APEX backend:", error);
  process.exit(1);
});
