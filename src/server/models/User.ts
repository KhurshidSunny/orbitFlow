import mongoose, { Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    globalRole: {
      type: String,
      enum: ["admin", "manager", "member"],
      default: "member",
    },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

export default mongoose.models.User || mongoose.model("User", UserSchema);

