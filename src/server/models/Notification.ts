import mongoose, { Schema, type InferSchemaType } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    data: { type: Schema.Types.Mixed },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type NotificationDocument = InferSchemaType<typeof NotificationSchema>;

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

