import httpStatus from "http-status";
import appError from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../../config";
import  bcrypt  from 'bcrypt';

const LoginUser = async (payload: TLoginUser) => {
  console.log(payload);
  const { id } = payload;

  const user = await User.isUserExistsByCustomId(id);

  // const isUserExist=await User.findOne({id})
  // // console.log(isUserExist)
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found !!");
  }
  // // console.log(isUserExist?.isDeleted)

  if (user?.isDeleted) {
    throw new appError(httpStatus.NOT_FOUND, "This user already Deleted");
  }
  if (user?.status === "block") {
    throw new appError(httpStatus.FORBIDDEN, "This user block ");
  }
  // const match = await bcrypt.compare(payload.password, user.password);
  const match =await User.isPasswordMatch(payload?.password, user?.password)
  console.log(match)


  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new appError(httpStatus.FORBIDDEN, "password can not match");
  }
  const jsonPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(
    jsonPayload,
    config.jwt_access_secret as string,
    { expiresIn: "10d" }
  );

  return {
    accessToken,
    needPasswordChange:user.needsPasswordChange,
  }
};

export const authServices = {
  LoginUser,
};
