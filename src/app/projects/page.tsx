import AppShell from "@/components/layout/AppShell";
import { connectToDatabase } from "@/lib/db";
import Project from "@/server/models/Project";
import User from "@/server/models/User";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";

const statusLabelMap: Record<string, string> = {
  backlog: "Backlog",
  planning: "Planning",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await connectToDatabase();
  const sessionUser = await getSessionUser();
  const [projects, users] = await Promise.all([
    Project.find({ isArchived: false }).sort({ createdAt: -1 }).lean(),
    User.find({}).lean(),
  ]);
  const userMap = new Map(
    users.map((user) => [user._id.toString(), user.name])
  );

  const viewer = sessionUser
    ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
    : { name: "Guest", role: "member", title: "Guest" };

  return (
    <AppShell
      active="projects"
      title="Projects"
      subtitle="Manage all projects you own or collaborate on."
      user={viewer}
      projectCount={projects.length}
      isAuthenticated={Boolean(sessionUser)}
    >
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id.toString()}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                {statusLabelMap[project.status ?? "planning"] ?? "Planning"}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Owner: {userMap.get(project.ownerId.toString()) ?? "Unassigned"}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Due:{" "}
              {project.dueDate
                ? new Date(project.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })
                : "TBD"}
            </p>
            <Link
              href={`/projects/${project._id.toString()}`}
              className="mt-5 block w-full rounded-xl border border-slate-200 py-2 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              View project
            </Link>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

