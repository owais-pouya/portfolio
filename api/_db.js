import { neon } from "@neondatabase/serverless";

export function getSql() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return neon(process.env.DATABASE_URL);
}

export function fail(res, status, error) {
  return res.status(status).json({ error });
}

export const PRIORITIES = ["low", "high"];
export function cleanTitle(t) {
  return typeof t === "string" && t.trim().length >= 1 && t.trim().length <= 120 ? t.trim() : null;
}
