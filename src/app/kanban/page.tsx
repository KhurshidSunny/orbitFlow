import AppShell from "@/components/layout/AppShell";
import { currentUser } from "@/lib/mock-user";

const columns = [
  {
    title: "Backlog",
    tasks: ["Sync roadmap priorities", "Add OAuth login", "Sprint planning"],
  },
  {
    title: "In Progress",
    tasks: ["Update dashboard cards", "Role permissions audit"],
  },
  {
    title: "Review",
    tasks: ["Kanban drag rules", "Activity log filters"],
  },
  {
    title: "Done",
    tasks: ["Landing page refresh", "User profile layout"],
  },
];

export default function KanbanPage() {
  return (
    <AppShell
      active="kanban"
      title="Kanban Board"
      subtitle="Track tasks by status and team ownership."
      user={currentUser}
    >
      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.title}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {column.title}
              </h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {column.tasks.length}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {column.tasks.map((task) => (
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
    </AppShell>
  );
}

