import AppShell from "@/components/layout/AppShell";
import OverviewCharts from "@/components/dashboard/OverviewCharts";
import { connectToDatabase } from "@/lib/db";
import ActivityLog from "@/server/models/ActivityLog";
import Column from "@/server/models/Column";
import Project from "@/server/models/Project";
import Task from "@/server/models/Task";
import User from "@/server/models/User";
import { getSessionUser } from "@/lib/auth";

const statusLabelMap: Record<string, string> = {
  backlog: "Backlog",
  planning: "Planning",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

const priorityLabelMap: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectToDatabase();
  const sessionUser = await getSessionUser();
  const isAuthenticated = Boolean(sessionUser);

  const [projects, tasks, users, activityLogs, columns] = await Promise.all([
    Project.find({ isArchived: false }).sort({ createdAt: -1 }).limit(6).lean(),
    Task.find({}).sort({ createdAt: -1 }).limit(6).lean(),
    User.find({}).lean(),
    ActivityLog.find({}).sort({ createdAt: -1 }).limit(3).lean(),
    Column.find({}).lean(),
  ]);

  const columnNameMap = new Map(
    columns.map((col) => [col._id.toString(), col.name])
  );
  const doneColumnIds = new Set(
    columns
      .filter((col) => col.name.toLowerCase() === "done")
      .map((col) => col._id.toString())
  );

  const openTasks = tasks.filter(
    (task) => !doneColumnIds.has(task.columnId.toString())
  );
  const overdueTasks = openTasks.filter(
    (task) => task.dueDate && task.dueDate < new Date()
  );
  const velocity =
    tasks.length === 0
      ? 0
      : Math.round(
          ((tasks.length - openTasks.length) / tasks.length) * 100
        );

  const stats = [
    {
      label: "Active Projects",
      value: `${projects.length}`,
      trend: "+2 this week",
      color:
        "from-sky-500 to-sky-400 text-white dark:from-sky-500 dark:to-sky-400",
      accent: "bg-white/80",
    },
    {
      label: "Open Tasks",
      value: `${openTasks.length}`,
      trend: `${overdueTasks.length} overdue`,
      color:
        "from-amber-400 to-yellow-300 text-white dark:from-amber-400 dark:to-yellow-300",
      accent: "bg-white/80",
    },
    {
      label: "Team Members",
      value: `${users.length}`,
      trend: "3 new invites",
      color:
        "from-emerald-500 to-emerald-400 text-white dark:from-emerald-500 dark:to-emerald-400",
      accent: "bg-white/80",
    },
    {
      label: "Velocity",
      value: `${velocity}%`,
      trend: velocity > 70 ? "On track" : "Needs attention",
      color:
        "from-violet-500 to-fuchsia-400 text-white dark:from-violet-500 dark:to-fuchsia-400",
      accent: "bg-white/80",
    },
  ];

  const userMap = new Map(
    users.map((user) => [user._id.toString(), user.name])
  );

  const projectRows = projects.map((project) => ({
    name: project.name,
    owner: userMap.get(project.ownerId.toString()) ?? "Unassigned",
    due: project.dueDate
      ? new Date(project.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })
      : "TBD",
    status: statusLabelMap[project.status ?? "planning"] ?? "Planning",
    priority: priorityLabelMap[project.priority ?? "medium"] ?? "Medium",
  }));

  const updates = activityLogs.map((log) => ({
    title: log.type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/^\w/, (c: string) => c.toUpperCase()),
    time: new Date(log.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }),
    detail: log.metadata?.title ?? "Activity updated.",
  }));

  const taskRows = tasks.slice(0, 3).map((task) => ({
    title: task.title,
    status: doneColumnIds.has(task.columnId.toString())
      ? "Done"
      : columnNameMap.get(task.columnId.toString()) ?? "Open",
    tag: task.tags?.[0] ?? "General",
  }));

  const velocityBase = Math.max(12, openTasks.length + 8);
  const velocityData = [
    { name: "Mon", value: velocityBase - 4 },
    { name: "Tue", value: velocityBase - 1 },
    { name: "Wed", value: velocityBase - 3 },
    { name: "Thu", value: velocityBase + 2 },
    { name: "Fri", value: velocityBase + 5 },
    { name: "Sat", value: velocityBase + 1 },
    { name: "Sun", value: velocityBase + 3 },
  ];

  const totalTasks = Math.max(tasks.length, 4);
  const doneTasks = totalTasks - openTasks.length;
  const workloadData = Array.from({ length: 4 }, (_, index) => {
    const planned = 20 + index * 8 + totalTasks;
    const completed = Math.max(
      8,
      Math.round((doneTasks / totalTasks) * planned)
    );
    return { name: `Week ${index + 1}`, planned, completed };
  });

  const viewer = sessionUser
    ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
    : { name: "Guest", role: "member", title: "Guest" };

  const blurHeavy = !isAuthenticated;

  return (
    <AppShell
      active="dashboard"
      title={`Welcome back, ${viewer.name}`}
      subtitle="Here’s the latest activity across your managed projects."
      user={viewer}
      projectCount={projects.length}
      isAuthenticated={isAuthenticated}
    >
      <section className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl bg-gradient-to-br ${stat.color} p-5 shadow-md`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{stat.label}</p>
              <span className={`h-2 w-2 rounded-full ${stat.accent}`} />
            </div>
            <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            <p className="mt-2 text-xs/5 opacity-90">{stat.trend}</p>
          </div>
        ))}
      </section>

      <section
        className={`mt-8 grid gap-6 lg:grid-cols-3 ${
          blurHeavy ? "pointer-events-none blur-md" : ""
        }`}
      >
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Projects</h2>
                <button className="text-sm text-sky-600 dark:text-sky-300">
                  View all
                </button>
              </div>
          <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 sm:block">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">Owner</th>
                      <th className="px-4 py-3">Due</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                {projectRows.map((project) => (
                      <tr
                        key={project.name}
                        className="border-t border-slate-200 dark:border-slate-800"
                      >
                    <td className="px-4 py-3 font-medium">{project.name}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                          {project.owner}
                        </td>
                        <td className="px-4 py-3">{project.due}</td>
                        <td className="px-4 py-3">
                      <span className="whitespace-nowrap rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                            {project.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                      <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
                            {project.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          <div className="mt-4 grid gap-3 sm:hidden">
            {projectRows.map((project) => (
              <div
                key={project.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{project.name}</p>
                  <span className="whitespace-nowrap rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Owner: {project.owner}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Due: {project.due}
                </p>
                <span className="mt-3 inline-flex whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
                  {project.priority}
                </span>
              </div>
            ))}
          </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold">Latest Updates</h2>
              <div className="mt-4 space-y-4">
                {updates.map((update) => (
                  <div
                    key={update.title}
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                  >
                    <p className="text-sm font-semibold">{update.title}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {update.time}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {update.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

      <section
        className={`mt-8 grid gap-6 lg:grid-cols-3 ${
          blurHeavy ? "pointer-events-none blur-md" : ""
        }`}
      >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold">Tasks at a glance</h2>
              <div className="mt-4 space-y-3">
            {taskRows.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800"
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {task.tag}
                      </p>
                    </div>
                <span className="whitespace-nowrap rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-100 via-white to-cyan-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Team Progress</h2>
                <button className="text-sm text-sky-600 dark:text-sky-300">
                  Export
                </button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {["Design", "Development", "QA"].map((team) => (
                  <div
                    key={team}
                    className="rounded-xl border border-slate-200 bg-white/70 p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {team}
                    </p>
                    <p className="mt-2 text-xl font-semibold">78%</p>
                    <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-2 w-[78%] rounded-full bg-sky-500" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
            Showing aggregated progress for the teams you manage. Members only
            see their assigned tasks.
              </p>
            </div>
          </section>

      <section
        className={`mt-8 ${
          blurHeavy ? "pointer-events-none blur-md" : ""
        }`}
      >
        <OverviewCharts
          velocityData={velocityData}
          workloadData={workloadData}
        />
      </section>

      {viewer.role === "manager" && isAuthenticated ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Manager Insights</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              You have 4 approvals pending across 2 projects.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                <span>OrbitFlow Mobile</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  2 approvals
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                <span>Client Onboarding</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  2 approvals
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Role-Based Visibility</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Managers see full project health and team velocity. Members only
              see their assigned tasks and updates.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">
                <p className="font-semibold">Manager View</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Access to project timeline, budgets, and team performance.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">
                <p className="font-semibold">Member View</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Task lists, assigned deliverables, and personal activity.
                </p>
              </div>
      </div>
    </div>
        </section>
      ) : null}
      {blurHeavy ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Please log in to view project details and real-time insights.
        </div>
      ) : null}
    </AppShell>
  );
}
