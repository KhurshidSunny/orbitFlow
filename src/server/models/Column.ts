import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ColumnSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    name: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ColumnDocument = InferSchemaType<typeof ColumnSchema>;

export default mongoose.models.Column || mongoose.model("Column", ColumnSchema);

