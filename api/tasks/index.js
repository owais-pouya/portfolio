import { getSql, fail, cleanTitle, PRIORITIES } from "../_db.js";

export default async function handler(req, res) {
  try {
    const sql = getSql();
    if (req.method === "GET") {
      const rows = await sql`SELECT id, title, priority FROM tasks ORDER BY id DESC`;
      return res.status(200).json(rows);
    }
    if (req.method === "POST") {
      const title = cleanTitle(req.body?.title);
      const priority = req.body?.priority ?? "low";
      if (!title) return fail(res, 400, "Title must be 1-120 characters.");
      if (!PRIORITIES.includes(priority)) return fail(res, 400, "Priority must be low or high.");
      const [row] = await sql`INSERT INTO tasks (title, priority) VALUES (${title}, ${priority}) RETURNING id, title, priority`;
      return res.status(201).json(row);
    }
    res.setHeader("Allow", "GET, POST");
    return fail(res, 405, "Method not allowed");
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error. Please try again.");
  }
}
