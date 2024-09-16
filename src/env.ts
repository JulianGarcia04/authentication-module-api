import { z } from "zod";

export const EnvSchema = z.object({
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_VERIFY_SERVICE: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.number(),
});
