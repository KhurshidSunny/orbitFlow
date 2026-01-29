import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ProjectMemberSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roleInProject: {
      type: String,
      enum: ["manager", "member"],
      default: "member",
    },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: { type: [ProjectMemberSchema], default: [] },
    status: {
      type: String,
      enum: ["backlog", "planning", "in_progress", "review", "done"],
      default: "planning",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type ProjectDocument = InferSchemaType<typeof ProjectSchema>;

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);

