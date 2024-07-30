import { Schema, model } from "mongoose";

import config from "../../../config";
import bcrypt from "bcrypt";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser,UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ["admin", "student", "Faculty"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});
// userSchema.static.isUserExistsByCustomId=async function (id:string){
//  return await User.findOne({id})
// }
// userSchema.static.isUserExistsByCustomId=async function (id:string) {
  
// }



export const User = model<TUser ,UserModel>("User", userSchema);
