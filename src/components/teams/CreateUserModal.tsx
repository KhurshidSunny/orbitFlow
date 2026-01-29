"use client";

import { useState } from "react";
import CreateUserForm from "@/components/teams/CreateUserForm";

type CreateUserModalProps = {
  allowedRoles: Array<"member" | "manager">;
};

export default function CreateUserModal({ allowedRoles }: CreateUserModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600"
      >
        Create user
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create new user</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 p-2 text-slate-600 dark:border-slate-800 dark:text-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <CreateUserForm allowedRoles={allowedRoles} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

