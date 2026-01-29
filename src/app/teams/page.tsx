import AppShell from "@/components/layout/AppShell";
import CreateUserModal from "@/components/teams/CreateUserModal";
import { connectToDatabase } from "@/lib/db";
import User from "@/server/models/User";
import Project from "@/server/models/Project";
import { getSessionUser } from "@/lib/auth";

const roleLabelMap: Record<string, string> = {
  admin: "Admin",
  manager: "Manager",
  member: "Member",
};

const statusByRole: Record<string, string> = {
  admin: "Online",
  manager: "Busy",
  member: "Offline",
};

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  await connectToDatabase();
  const sessionUser = await getSessionUser();
  const [teamMembers, projectCount] = await Promise.all([
    User.find({}).sort({ createdAt: -1 }).lean(),
    Project.countDocuments({ isArchived: false }),
  ]);
  const role = sessionUser?.role ?? "member";
  const canCreateUsers = role === "admin" || role === "manager";
  return (
    <AppShell
      active="teams"
      title="Teams"
      subtitle="Manage members and project collaboration."
      user={
        sessionUser
          ? { name: sessionUser.name, role: sessionUser.role, title: "User" }
          : { name: "Guest", role: "member", title: "Guest" }
      }
      projectCount={projectCount}
      isAuthenticated={Boolean(sessionUser)}
    >
      {canCreateUsers ? (
        <div className="mt-8 flex justify-end">
          <CreateUserModal
            allowedRoles={role === "admin" ? ["member", "manager"] : ["member"]}
          />
        </div>
      ) : null}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {teamMembers.map((member) => (
          <div
            key={member._id.toString()}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-base font-semibold">{member.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {roleLabelMap[member.globalRole ?? "member"] ?? "Member"}
                </p>
              </div>
              <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                {statusByRole[member.globalRole ?? "member"] ?? "Offline"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

