import mongoose, { Schema, type InferSchemaType } from "mongoose";

const TaskSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    columnId: { type: Schema.Types.ObjectId, ref: "Column", required: true },
    title: { type: String, required: true },
    description: { type: String },
    assigneeId: { type: Schema.Types.ObjectId, ref: "User" },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },
    tags: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export type TaskDocument = InferSchemaType<typeof TaskSchema>;

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);

