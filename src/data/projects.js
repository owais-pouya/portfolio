// One object per course project. The Projects section renders them with map().
// TODO: add ALL your course projects. Each needs a real screenshot in
// /public/screenshots and a working live link.
export const projects = [
  {
    id: "task-manager",
    title: "Task Manager",
    description:
      "Add, edit, prioritise and delete tasks. Data is stored in a real Postgres database through a REST API, so tasks persist between visits.",
    tech: ["React", "Tailwind CSS", "REST API", "Postgres"],
    image: "/screenshots/task-manager.svg", // TODO: replace with a real screenshot
    alt: "Task Manager app showing a list of tasks with priority labels",
    live: "/tasks",
    code: "https://github.com/your-username/your-repo", // TODO
  },
  // TODO: copy the object above for each remaining course project.
];
