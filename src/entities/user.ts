import { compareSync } from "bcrypt";
import { Schema } from "mongoose";

export default class User {
  name!: string;
  password!: string;
  _id!: Schema.Types.ObjectId;

  public constructor(
    name: string,
    password: string,
    _id: Schema.Types.ObjectId
  ) {
    this.name = name;
    this.password = password;
    this._id = _id;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): Schema.Types.ObjectId {
    return this._id;
  }

  public checkPassword(str: string) {
    return compareSync(str, this.password);
  }
}
