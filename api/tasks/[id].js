import { getSql, fail, cleanTitle, PRIORITIES } from "../_db.js";

export default async function handler(req, res) {
  try {
    const id = Number(req.query.id);
    if (!Number.isInteger(id) || id < 1) return fail(res, 400, "Invalid task id.");
    const sql = getSql();

    if (req.method === "PUT") {
      const title = cleanTitle(req.body?.title);
      const priority = req.body?.priority;
      if (!title) return fail(res, 400, "Title must be 1-120 characters.");
      if (!PRIORITIES.includes(priority)) return fail(res, 400, "Priority must be low or high.");
      const rows = await sql`UPDATE tasks SET title = ${title}, priority = ${priority} WHERE id = ${id} RETURNING id, title, priority`;
      return rows.length ? res.status(200).json(rows[0]) : fail(res, 404, "Task not found.");
    }
    if (req.method === "PATCH") {
      const priority = req.body?.priority;
      if (!PRIORITIES.includes(priority)) return fail(res, 400, "Priority must be low or high.");
      const rows = await sql`UPDATE tasks SET priority = ${priority} WHERE id = ${id} RETURNING id, title, priority`;
      return rows.length ? res.status(200).json(rows[0]) : fail(res, 404, "Task not found.");
    }
    if (req.method === "DELETE") {
      const rows = await sql`DELETE FROM tasks WHERE id = ${id} RETURNING id`;
      return rows.length ? res.status(204).end() : fail(res, 404, "Task not found.");
    }
    res.setHeader("Allow", "PUT, PATCH, DELETE");
    return fail(res, 405, "Method not allowed");
  } catch (err) {
    console.error(err);
    return fail(res, 500, "Server error. Please try again.");
  }
}
