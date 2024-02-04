import mongoose, { Schema } from "mongoose";
import { hashSync, genSaltSync } from "bcrypt";
import User from "../entities/user";

const Types = Schema.Types;

const user = new Schema<User>({
  name: {
    type: Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Types.String,
    required: true,
  },
});

function hashPassword(password: string): string {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

user.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    this.password = hashPassword(this.password as string);
  }

  next();
});

export default mongoose.model("user", user);
