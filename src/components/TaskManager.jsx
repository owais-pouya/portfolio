import { useEffect, useState } from "react";
import { getTasks, addTask, editTask, changePriority, removeTask } from "../tasksApi.js";

export default function TaskManager() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setInitial(false));
  }, []);

  // Same loading / success / error steps for every API request.
  async function run(action, message) {
    if (loading) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await action();
      setSuccess(message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return setError("Please enter a task title.");
    run(async () => {
      const task = await addTask({ title: title.trim(), priority });
      setTasks((old) => [task, ...old]);
      setTitle("");
      setPriority("low");
    }, "Task added!");
  }

  function edit(task) {
    const newTitle = prompt("New task title:", task.title);
    if (newTitle === null) return;
    if (!newTitle.trim()) return setError("Title cannot be empty.");
    run(async () => {
      const updated = await editTask(task.id, { title: newTitle.trim(), priority: task.priority });
      setTasks((old) => old.map((t) => (t.id === task.id ? updated : t)));
    }, "Task updated!");
  }

  function toggle(task) {
    const next = task.priority === "low" ? "high" : "low";
    run(async () => {
      const updated = await changePriority(task.id, next);
      setTasks((old) => old.map((t) => (t.id === task.id ? updated : t)));
    }, "Priority changed!");
  }

  function remove(id) {
    run(async () => {
      await removeTask(id);
      setTasks((old) => old.filter((t) => t.id !== id));
    }, "Task deleted!");
  }

  const btn = "rounded-lg border border-line px-3 py-2 text-sm font-medium transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <main className="mx-auto max-w-2xl px-5 py-14">
      <a href="/" className="text-sm font-medium text-muted underline underline-offset-4">&larr; Back to portfolio</a>
      <h1 className="mt-6 font-display text-5xl font-bold">Task Manager</h1>
      <p className="mt-2 text-muted">React + REST API + Postgres</p>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="task-title" className="sr-only">Task title</label>
        <input id="task-title" placeholder="Task title" maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} className="min-w-0 flex-1 rounded-lg border border-line bg-white px-4 py-3" />
        <label htmlFor="task-priority" className="sr-only">Priority</label>
        <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)} disabled={loading} className="rounded-lg border border-line bg-white px-4 py-3">
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <button disabled={loading} className="rounded-lg bg-ink px-6 py-3 font-medium text-paper hover:bg-accent disabled:opacity-50">{loading ? "Please wait..." : "Add"}</button>
      </form>

      {error && <p role="alert" className="mt-4 font-medium text-red-700">{error}</p>}
      {success && <p role="status" className="mt-4 font-medium text-green-800">{success}</p>}

      <h2 className="mt-10 font-display text-2xl font-bold">Tasks</h2>
      {initial && <p className="mt-4 text-muted">Loading tasks...</p>}
      <ul className="mt-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex flex-col gap-3 border-t border-line py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="break-words">
              {task.title}{" "}
              <span className={`ml-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${task.priority === "high" ? "bg-accent text-white" : "bg-line text-ink"}`}>{task.priority}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              <button className={btn} disabled={loading} onClick={() => edit(task)}>Edit</button>
              <button className={btn} disabled={loading} onClick={() => toggle(task)}>Priority</button>
              <button className={btn} disabled={loading} onClick={() => remove(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {!initial && !tasks.length && !error && <p className="mt-4 text-muted">No tasks yet.</p>}
    </main>
  );
}
