import { model, Schema } from "mongoose";

export const UserModel = model(
  "users",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
      sex: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      user_image_path: {
        type: String,
      },
      role: {
        type: String,
        default: "user",
      },
    },
    {
      timestamps: true,
    }
  )
);
