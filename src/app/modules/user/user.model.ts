import { Schema, model } from "mongoose";

import config from "../../../config";
import bcrypt from "bcrypt";
import { TUser, UserModel } from "./user.interface";
import { userStatus } from "./user.const";


const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeDate: { type: Date },
    role: { type: String, enum: ["admin", "student", "Faculty"] },
    status: {
      type: String,
      enum: userStatus,
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
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatch = async function (
  plainPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainPassword, hashPassword);
  // await bcrypt.compare(payload.password, user.password)
};

userSchema.statics.isJwtCreateBeforePasswordChange = async function (
  PasswordChangeTime:Date,
  jwtCreateTime:number
) {
  const PasswordChangeTimeinSecentd=new Date(PasswordChangeTime).getTime()/1000;
  return(PasswordChangeTimeinSecentd>jwtCreateTime)
};

export const User = model<TUser, UserModel>("User", userSchema);
