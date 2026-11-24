import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index(
  { email: 1 },
  {
    unique: true,
    name: "unique_user_email",
  }
);

const User: Model<IUser> =
  mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);

export default User;