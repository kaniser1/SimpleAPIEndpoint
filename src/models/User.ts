import mongoose, { Schema } from "mongoose";
import { IUser } from "./interfaces";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);