import AppShell from "@/components/layout/AppShell";
import { connectToDatabase } from "@/lib/db";
import Column from "@/server/models/Column";
import Project from "@/server/models/Project";
import Task from "@/server/models/Task";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function KanbanPage() {
  await connectToDatabase();
  const sessionUser = await getSessionUser();
  const project = await Project.findOne({ isArchived: false })
    .sort({ createdAt: -1 })
    .lean();
  const projectCount = await Project.countDocuments({ isArchived: false });

  const viewer = sessionUser
    ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
    : { name: "Guest", role: "member", title: "Guest" };

  const columns = project
    ? await Column.find({ projectId: project._id }).sort({ order: 1 }).lean()
    : [];
  const tasks = project
    ? await Task.find({ projectId: project._id }).lean()
    : [];

  const tasksByColumn = new Map<string, string[]>();
  tasks.forEach((task) => {
    const key = task.columnId.toString();
    if (!tasksByColumn.has(key)) tasksByColumn.set(key, []);
    tasksByColumn.get(key)?.push(task.title);
  });

  return (
    <AppShell
      active="kanban"
      title="Kanban Board"
      subtitle="Track tasks by status and team ownership."
      user={viewer}
      projectCount={projectCount}
      isAuthenticated={Boolean(sessionUser)}
    >
      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column._id.toString()}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {column.name}
              </h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {tasksByColumn.get(column._id.toString())?.length ?? 0}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {(tasksByColumn.get(column._id.toString()) ?? []).map((task) => (
                <div
                  key={task}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!project ? (
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          No projects found yet. Seed the database to view the kanban board.
        </p>
      ) : null}
    </AppShell>
  );
}

