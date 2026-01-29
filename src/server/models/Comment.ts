import mongoose, { Schema, type InferSchemaType } from "mongoose";

const CommentSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export type CommentDocument = InferSchemaType<typeof CommentSchema>;

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

