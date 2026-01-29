import AppShell from "@/components/layout/AppShell";
import { connectToDatabase } from "@/lib/db";
import ActivityLog from "@/server/models/ActivityLog";
import Project from "@/server/models/Project";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ActivityPage() {
  await connectToDatabase();
  const sessionUser = await getSessionUser();
  const [activityLogs, projects] = await Promise.all([
    ActivityLog.find({}).sort({ createdAt: -1 }).limit(8).lean(),
    Project.find({}).lean(),
  ]);

  const projectMap = new Map(
    projects.map((project) => [project._id.toString(), project.name])
  );

  const projectCount = projects.length;

  const viewer = sessionUser
    ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
    : { name: "Guest", role: "member", title: "Guest" };

  const activity = activityLogs.map((log) => ({
    title: log.type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase()),
    detail: `${projectMap.get(log.projectId.toString()) ?? "Project"} · ${
      log.metadata?.title ?? "Update recorded"
    }`,
    time: new Date(log.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }),
  }));

  return (
    <AppShell
      active="activity"
      title="Activity Log"
      subtitle="Recent updates across your workspace."
      user={viewer}
      projectCount={projectCount}
      isAuthenticated={Boolean(sessionUser)}
    >
      <div className="mt-8 space-y-4">
        {activity.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {item.time}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

