"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type VelocityPoint = { name: string; value: number };
type WorkloadPoint = { name: string; planned: number; completed: number };

type OverviewChartsProps = {
  velocityData: VelocityPoint[];
  workloadData: WorkloadPoint[];
};

export default function OverviewCharts({
  velocityData,
  workloadData,
}: OverviewChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Weekly Velocity</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Tasks closed
          </span>
        </div>
        <div className="mt-4 h-56 sm:h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={velocityData}>
              <defs>
                <linearGradient id="velocity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={32} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0ea5e9"
                fill="url(#velocity)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Planned vs Completed</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Sprint throughput
          </span>
        </div>
        <div className="mt-4 h-56 sm:h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={workloadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={32} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="planned"
                stroke="#6366f1"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

