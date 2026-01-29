import AppShell from "@/components/layout/AppShell";
import { currentUser } from "@/lib/mock-user";

const teamMembers = [
  { name: "Shariar Hossain", role: "Manager", status: "Online" },
  { name: "Alicia James", role: "Product Designer", status: "Online" },
  { name: "John Deo", role: "Frontend Engineer", status: "Offline" },
  { name: "Jennifer Vintage", role: "QA Specialist", status: "Busy" },
];

export default function TeamsPage() {
  return (
    <AppShell
      active="teams"
      title="Teams"
      subtitle="Manage members and project collaboration."
      user={currentUser}
    >
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {teamMembers.map((member) => (
          <div
            key={member.name}
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
                  {member.role}
                </p>
              </div>
              <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

