import { z } from "zod";

/*
 * Environment variable validation. Throws on boot if required vars are missing
 * so misconfiguration surfaces immediately instead of as a runtime 500 later.
 *
 * Server-only secrets are never read in the browser. The client bundle only
 * sees NEXT_PUBLIC_* values.
 */

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverSchema = publicSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RESOLVE_SECRET: z.string().min(1).optional(),
});

const isServer = typeof window === "undefined";

const parsed = (isServer ? serverSchema : publicSchema).safeParse(
  isServer
    ? {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        RESOLVE_SECRET: process.env.RESOLVE_SECRET,
      }
    : {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
  throw new Error(`Invalid environment variables:\n${issues}\n\nCopy .env.example to .env.local and fill it in.`);
}

export const env = parsed.data;
