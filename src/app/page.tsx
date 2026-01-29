import AppShell from "@/components/layout/AppShell";
import OverviewCharts from "@/components/dashboard/OverviewCharts";
import { currentUser } from "@/lib/mock-user";

const stats = [
  {
    label: "Active Projects",
    value: "12",
    trend: "+2 this week",
    color:
      "from-sky-500 to-sky-400 text-white dark:from-sky-500 dark:to-sky-400",
    accent: "bg-white/80",
  },
  {
    label: "Open Tasks",
    value: "58",
    trend: "12 overdue",
    color:
      "from-amber-400 to-yellow-300 text-slate-900 dark:from-amber-400 dark:to-yellow-300",
    accent: "bg-white/80",
  },
  {
    label: "Team Members",
    value: "24",
    trend: "3 new invites",
    color:
      "from-emerald-500 to-emerald-400 text-white dark:from-emerald-500 dark:to-emerald-400",
    accent: "bg-white/80",
  },
  {
    label: "Velocity",
    value: "76%",
    trend: "On track",
    color:
      "from-violet-500 to-fuchsia-400 text-white dark:from-violet-500 dark:to-fuchsia-400",
    accent: "bg-white/80",
  },
];

const projects = [
  {
    name: "OrbitFlow Mobile",
    owner: "Alicia James",
    due: "Jun 26",
    status: "In Progress",
    priority: "High",
  },
  {
    name: "Client Onboarding",
    owner: "John Deo",
    due: "Jul 04",
    status: "Planning",
    priority: "Medium",
  },
  {
    name: "Analytics Revamp",
    owner: "Jennifer Vintage",
    due: "Aug 19",
    status: "Review",
    priority: "Low",
  },
];

const updates = [
  {
    title: "New Kanban columns added",
    time: "2 hours ago",
    detail: "Sprint 12 board updated by Alicia.",
  },
  {
    title: "Design system tokens synced",
    time: "5 hours ago",
    detail: "Color palette aligned with brand kit.",
  },
  {
    title: "Access request approved",
    time: "1 day ago",
    detail: "Shariar added to Mobile release project.",
  },
];

const tasks = [
  { title: "Finalize dashboard header", status: "Open", tag: "UI" },
  { title: "Update task drag rules", status: "In Review", tag: "Kanban" },
  { title: "Prepare release notes", status: "Done", tag: "Docs" },
];

export default function Home() {
  return (
    <AppShell
      active="dashboard"
      title="Welcome back, Jalil"
      subtitle="Here’s the latest activity across your managed projects."
      user={currentUser}
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

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
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
                {projects.map((project) => (
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
            {projects.map((project) => (
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

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Tasks at a glance</h2>
          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
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
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
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

      <section className="mt-8">
        <OverviewCharts />
      </section>

      {currentUser.role === "manager" ? (
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
    </AppShell>
  );
}
