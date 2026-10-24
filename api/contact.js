import { getSql, fail } from "./_db.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(res, 405, "Method not allowed");
  }
  try {
    const { name, email, message, website } = req.body ?? {};
    if (website) return res.status(201).json({ ok: true }); // honeypot: pretend success to bots
    if (typeof name !== "string" || !name.trim() || name.length > 100) return fail(res, 400, "Please enter a valid name.");
    if (typeof email !== "string" || !EMAIL.test(email) || email.length > 200) return fail(res, 400, "Please enter a valid email.");
    if (typeof message !== "string" || message.trim().length < 10 || message.length > 2000) return fail(res, 400, "Message must be 10-2000 characters.");

    const sql = getSql();
    const [{ count }] = await sql`SELECT count(*)::int AS count FROM messages WHERE email = ${email} AND created_at > now() - interval '1 hour'`;
    if (count >= 5) return fail(res, 429, "Too many messages. Please try again later.");

    await sql`INSERT INTO messages (name, email, message) VALUES (${name.trim()}, ${email.trim()}, ${message.trim()})`;
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error. Your message was not sent.");
  }
}
