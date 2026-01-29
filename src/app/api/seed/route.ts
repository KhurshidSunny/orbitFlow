import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/server/models/User";
import Project from "@/server/models/Project";
import Column from "@/server/models/Column";
import Task from "@/server/models/Task";
import ActivityLog from "@/server/models/ActivityLog";

async function seedDatabase() {
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Column.deleteMany({}),
    Task.deleteMany({}),
    ActivityLog.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash("Orbitflow@123", 10);

  const [admin, manager, member] = await User.create([
    {
      name: "Jalil Rehman",
      email: "jalil@orbitflow.io",
      globalRole: "admin",
      passwordHash,
    },
    {
      name: "Alicia James",
      email: "alicia@orbitflow.io",
      globalRole: "manager",
      passwordHash,
    },
    {
      name: "John Deo",
      email: "john@orbitflow.io",
      globalRole: "member",
      passwordHash,
    },
  ]);

  const [mobileProject, onboardingProject, analyticsProject] =
    await Project.create([
      {
        name: "OrbitFlow Mobile",
        description: "Mobile app roadmap and release planning.",
        ownerId: manager._id,
        status: "in_progress",
        priority: "high",
        dueDate: new Date("2025-06-26"),
        members: [
          { userId: manager._id, roleInProject: "manager" },
          { userId: member._id, roleInProject: "member" },
        ],
      },
      {
        name: "Client Onboarding",
        description: "Improve onboarding workflow and automation.",
        ownerId: admin._id,
        status: "planning",
        priority: "medium",
        dueDate: new Date("2025-07-04"),
        members: [
          { userId: admin._id, roleInProject: "manager" },
          { userId: member._id, roleInProject: "member" },
        ],
      },
      {
        name: "Analytics Revamp",
        description: "Refresh analytics dashboard and KPI tracking.",
        ownerId: manager._id,
        status: "review",
        priority: "low",
        dueDate: new Date("2025-08-19"),
        members: [{ userId: manager._id, roleInProject: "manager" }],
      },
    ]);

  const columns = await Column.create([
    { projectId: mobileProject._id, name: "Backlog", order: 0 },
    { projectId: mobileProject._id, name: "In Progress", order: 1 },
    { projectId: mobileProject._id, name: "Review", order: 2 },
    { projectId: mobileProject._id, name: "Done", order: 3 },
    { projectId: onboardingProject._id, name: "Backlog", order: 0 },
    { projectId: onboardingProject._id, name: "In Progress", order: 1 },
    { projectId: onboardingProject._id, name: "Review", order: 2 },
    { projectId: onboardingProject._id, name: "Done", order: 3 },
    { projectId: analyticsProject._id, name: "Backlog", order: 0 },
    { projectId: analyticsProject._id, name: "In Progress", order: 1 },
    { projectId: analyticsProject._id, name: "Review", order: 2 },
    { projectId: analyticsProject._id, name: "Done", order: 3 },
  ]);

  const mobileColumns = columns.filter(
    (col) => col.projectId.toString() === mobileProject._id.toString()
  );
  const onboardingColumns = columns.filter(
    (col) => col.projectId.toString() === onboardingProject._id.toString()
  );

  const tasks = await Task.create([
    {
      projectId: mobileProject._id,
      columnId: mobileColumns[1]._id,
      title: "Update dashboard cards",
      description: "Refine colors for light/dark themes.",
      assigneeId: manager._id,
      priority: "high",
      tags: ["ui", "dashboard"],
      createdBy: admin._id,
    },
    {
      projectId: mobileProject._id,
      columnId: mobileColumns[0]._id,
      title: "Define RBAC rules",
      description: "Clarify admin/manager/member permissions.",
      assigneeId: member._id,
      priority: "medium",
      tags: ["auth", "rbac"],
      createdBy: admin._id,
    },
    {
      projectId: onboardingProject._id,
      columnId: onboardingColumns[1]._id,
      title: "Automate invite flow",
      description: "Auto-assign default role on invite.",
      assigneeId: admin._id,
      priority: "medium",
      tags: ["workflow"],
      createdBy: admin._id,
    },
    {
      projectId: onboardingProject._id,
      columnId: onboardingColumns[3]._id,
      title: "Onboarding checklist",
      description: "Create checklist template for new clients.",
      assigneeId: member._id,
      priority: "low",
      tags: ["docs"],
      createdBy: manager._id,
    },
  ]);

  await ActivityLog.create([
    {
      projectId: mobileProject._id,
      userId: admin._id,
      type: "PROJECT_CREATED",
      metadata: { projectId: mobileProject._id, name: mobileProject.name },
    },
    {
      projectId: mobileProject._id,
      userId: manager._id,
      type: "TASK_CREATED",
      metadata: { taskId: tasks[0]._id, title: tasks[0].title },
    },
    {
      projectId: onboardingProject._id,
      userId: admin._id,
      type: "TASK_COMPLETED",
      metadata: { taskId: tasks[3]._id, title: tasks[3].title },
    },
  ]);

  return {
    ok: true,
    projectIds: [
      mobileProject._id.toString(),
      onboardingProject._id.toString(),
      analyticsProject._id.toString(),
    ],
  };
}

export async function POST() {
  const result = await seedDatabase();
  return NextResponse.json(result);
}

export async function GET() {
  const result = await seedDatabase();
  return NextResponse.json(result);
}

