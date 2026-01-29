"use client";

import { useState } from "react";

type CreateUserFormProps = {
  allowedRoles: Array<"member" | "manager">;
};

export default function CreateUserForm({ allowedRoles }: CreateUserFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"member" | "manager">(
    allowedRoles[0] ?? "member"
  );
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus(data.error ?? "Unable to create user.");
      return;
    }
    setStatus("User created successfully.");
    setEmail("");
    setPassword("");
    setRole(allowedRoles[0] ?? "member");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="user@orbitflow.io"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Strong password"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
            Role
          </label>
          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value as "member" | "manager")
            }
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            {allowedRoles.map((allowedRole) => (
              <option key={allowedRole} value={allowedRole}>
                {allowedRole}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:opacity-70"
        >
          {loading ? "Creating..." : "Create user"}
        </button>
        {status ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {status}
          </p>
        ) : null}
      </div>
    </form>
  );
}

