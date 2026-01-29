import AppShell from "@/components/layout/AppShell";
import { connectToDatabase } from "@/lib/db";
import Project from "@/server/models/Project";
import { getSessionUser } from "@/lib/auth";

const settings = [
  {
    title: "Profile",
    description: "Update name, avatar, and timezone preferences.",
  },
  {
    title: "Security",
    description: "Manage password, MFA, and active sessions.",
  },
  {
    title: "Notifications",
    description: "Control email and in-app notification settings.",
  },
];

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await connectToDatabase();
  const sessionUser = await getSessionUser();
  const projectCount = await Project.countDocuments({ isArchived: false });
  const viewer = sessionUser
    ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
    : { name: "Guest", role: "member", title: "Guest" };

  return (
    <AppShell
      active="settings"
      title="Settings"
      subtitle="Control profile, security, and notification preferences."
      user={viewer}
      projectCount={projectCount}
      isAuthenticated={Boolean(sessionUser)}
    >
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {settings.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {item.description}
            </p>
            <button className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
              Manage
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

