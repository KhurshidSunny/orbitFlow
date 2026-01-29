import AppShell from "@/components/layout/AppShell";
import { connectToDatabase } from "@/lib/db";
import Project from "@/server/models/Project";
import Task from "@/server/models/Task";
import User from "@/server/models/User";
import { getSessionUser } from "@/lib/auth";
import mongoose from "mongoose";

type Params = { params: { projectId: string } };

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: Params) {
  await connectToDatabase();
  const projectId = decodeURIComponent(params.projectId);
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    return (
      <AppShell
        active="projects"
        title="Project not found"
        subtitle="The requested project does not exist."
        user={{ name: "Guest", role: "member", title: "Guest" }}
      >
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Please return to the projects list.
        </div>
      </AppShell>
    );
  }
  const sessionUser = await getSessionUser();
  const [project, tasks, users, allProjects] = await Promise.all([
    Project.findById(projectId).lean(),
    Task.find({ projectId }).lean(),
    User.find({}).lean(),
    Project.find({ isArchived: false }).lean(),
  ]);

  if (!project) {
    return (
      <AppShell
        active="projects"
        title="Project not found"
        subtitle="The requested project does not exist."
        user={
          sessionUser
            ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
            : { name: "Guest", role: "member", title: "Guest" }
        }
        projectCount={allProjects.length}
        isAuthenticated={Boolean(sessionUser)}
      >
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Please return to the projects list.
        </div>
      </AppShell>
    );
  }

  const userMap = new Map(
    users.map((user) => [user._id.toString(), user.name])
  );

  const viewer = sessionUser
    ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
    : { name: "Guest", role: "member", title: "Guest" };

  return (
    <AppShell
      active="projects"
      title={project.name}
      subtitle={project.description ?? "Project overview"}
      user={viewer}
      projectCount={allProjects.length}
      isAuthenticated={Boolean(sessionUser)}
    >
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Project Summary</h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Owner: {userMap.get(project.ownerId.toString()) ?? "Unassigned"}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Status: {project.status?.replace(/_/g, " ") ?? "planning"}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Priority: {project.priority ?? "medium"}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Due:{" "}
            {project.dueDate
              ? new Date(project.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "TBD"}
          </p>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Recent Tasks</h2>
          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
              <div
                key={task._id.toString()}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800"
              >
                <p className="font-medium">{task.title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Assignee:{" "}
                  {task.assigneeId
                    ? userMap.get(task.assigneeId.toString()) ?? "Unassigned"
                    : "Unassigned"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

