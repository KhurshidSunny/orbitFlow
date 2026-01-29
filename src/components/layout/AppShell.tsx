import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { currentUser as defaultUser } from "@/lib/mock-user";

type AppShellProps = {
  active: "dashboard" | "projects" | "kanban" | "activity" | "teams" | "settings";
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  user?: {
    name: string;
    role: string;
    title: string;
  };
};

const navItems = [
  { key: "dashboard", label: "Dashboard", href: "/" },
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "kanban", label: "Kanban", href: "/kanban" },
  { key: "activity", label: "Activity", href: "/activity" },
  { key: "teams", label: "Teams", href: "/teams" },
  { key: "settings", label: "Settings", href: "/settings" },
] as const;

export default function AppShell({
  active,
  title,
  subtitle,
  children,
  user,
}: AppShellProps) {
  const currentUser = user ?? defaultUser;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-900 lg:flex">
          <div className="flex items-center gap-3">
            <Image
              className="block dark:hidden"
              src="/logo-light.svg"
              alt="OrbitFlow logo"
              width={140}
              height={40}
            />
            <Image
              className="hidden dark:block"
              src="/logo-dark.svg"
              alt="OrbitFlow logo"
              width={140}
              height={40}
            />
          </div>
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              SH
            </div>
            <div>
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser.title}
              </p>
            </div>
          </div>
          <nav className="mt-10 space-y-2 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                  active === item.key
                    ? "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <span>{item.label}</span>
                {item.key === "projects" && (
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    12
                  </span>
                )}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 p-4 text-white">
            <p className="text-sm font-semibold">Role-based access active</p>
            <p className="mt-2 text-xs text-white/80">
              Managers can edit project workflow and assign tasks.
            </p>
            <button className="mt-4 w-full rounded-xl bg-white/20 py-2 text-xs font-semibold">
              View Permissions
            </button>
          </div>
        </aside>

        <main className="flex-1 px-6 py-8 lg:px-10">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Good evening
              </p>
              <h1 className="text-2xl font-semibold">{title}</h1>
              {subtitle ? (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Role:{" "}
                <span className="font-semibold capitalize">
                  {currentUser.role}
                </span>
              </div>
              <ThemeToggle />
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

