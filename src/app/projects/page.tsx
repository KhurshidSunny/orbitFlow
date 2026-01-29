import AppShell from "@/components/layout/AppShell";
import { currentUser } from "@/lib/mock-user";

const projects = [
  {
    name: "OrbitFlow Mobile",
    status: "In Progress",
    owner: "Alicia James",
    due: "Jun 26",
  },
  {
    name: "Client Onboarding",
    status: "Planning",
    owner: "John Deo",
    due: "Jul 04",
  },
  {
    name: "Analytics Revamp",
    status: "Review",
    owner: "Jennifer Vintage",
    due: "Aug 19",
  },
  {
    name: "Payments Upgrade",
    status: "Backlog",
    owner: "William Jem",
    due: "Sep 02",
  },
];

export default function ProjectsPage() {
  return (
    <AppShell
      active="projects"
      title="Projects"
      subtitle="Manage all projects you own or collaborate on."
      user={currentUser}
    >
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                {project.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Owner: {project.owner}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Due: {project.due}
            </p>
            <button className="mt-5 w-full rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
              View project
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

