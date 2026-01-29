import AppShell from "@/components/layout/AppShell";
import { currentUser } from "@/lib/mock-user";

const activity = [
  {
    title: "Task moved to Review",
    detail: "OrbitFlow Mobile · UI polish checklist",
    time: "10 minutes ago",
  },
  {
    title: "New member added",
    detail: "Samantha joined Client Onboarding",
    time: "2 hours ago",
  },
  {
    title: "Project archived",
    detail: "Legacy CRM Integration",
    time: "Yesterday",
  },
  {
    title: "Task assigned",
    detail: "Alicia assigned to Release Notes",
    time: "2 days ago",
  },
];

export default function ActivityPage() {
  return (
    <AppShell
      active="activity"
      title="Activity Log"
      subtitle="Recent updates across your workspace."
      user={currentUser}
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

