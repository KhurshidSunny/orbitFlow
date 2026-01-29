import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ActivityLogSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export type ActivityLogDocument = InferSchemaType<typeof ActivityLogSchema>;

export default mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", ActivityLogSchema);

