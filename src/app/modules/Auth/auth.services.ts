import httpStatus from "http-status";
import appError from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utills";
import jwt from "jsonwebtoken"
import { sendMail } from "../../utility/sendmail";

const LoginUser = async (payload: TLoginUser) => {
  // console.log(payload);
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
  // const match =await User.isPasswordMatch(payload?.password, user?.password)
  // console.log(match)

  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new appError(httpStatus.FORBIDDEN, "password can not match");
  }
  const jsonPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jsonPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );

  const refreshToken = createToken(
    jsonPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { OldPassword: string; newPassword: string }
) => {
  // console.log(userData, payload);
  const user = await User.isUserExistsByCustomId(userData?.userId);
  // console.log(user)

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found !!");
  }

  if (user?.isDeleted) {
    throw new appError(httpStatus.NOT_FOUND, "This user already Deleted");
  }
  if (user?.status === "block") {
    throw new appError(httpStatus.FORBIDDEN, "This user block ");
  }
  // console.log(user.password,payload.oldPassword)

  if (!(await User.isPasswordMatch(payload?.OldPassword, user?.password))) {
    throw new appError(httpStatus.FORBIDDEN, "password can not match");
  }

  const newHashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.saltRound)
  );
  // console.log(newHashPassword)

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeDate: new Date(),
    }
  );

  return result;
};


const refreshToken=async(token:string)=>{
  
  if (!token) {
    throw new appError(httpStatus.UNAUTHORIZED, "You are  unauthorize user");
  }
  // Verified Token

    const decoded = jwt.verify(token,
      config.jwt_refresh_secret as string) as JwtPayload;
      const{userId,iat}=decoded
      

      const user = await User.isUserExistsByCustomId(userId);
      // console.log(user)
    
      if (!user) {
        throw new appError(httpStatus.NOT_FOUND, "This user is not found !!");
      }
    
      if (user?.isDeleted) {
        throw new appError(httpStatus.NOT_FOUND, "This user already Deleted");
      }
      if (user?.status === "block") {
        throw new appError(httpStatus.FORBIDDEN, "This user block ");
      }
      

      if(user.passwordChangeDate && User.isJwtCreateBeforePasswordChange(
        user.passwordChangeDate ,iat as number
      )){
        throw new appError(httpStatus.UNAUTHORIZED,'you are not authorized')
        
      }
      const jsonPayload = {
        userId: user?.id,
        role: user?.role,
      };
      const accessToken = createToken(
        jsonPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_in as string
      );

      return accessToken

}

const forgetPassword=async(id:string)=>{
  const user = await User.isUserExistsByCustomId(id);
      // console.log(user)
    
      if (!user) {
        throw new appError(httpStatus.NOT_FOUND, "This user is not found !!");
      }
    
      if (user?.isDeleted) {
        throw new appError(httpStatus.NOT_FOUND, "This user already Deleted");
      }
      if (user?.status === "block") {
        throw new appError(httpStatus.FORBIDDEN, "This user block ");
      }
      const jsonPayload = {
        userId: user?.id,
        role: user?.role,
      };
      const accessToken = createToken(
        jsonPayload,
        config.jwt_access_secret as string,
        '10m'
      );
  

      const restUILink=`${config.jwt_reset_password_ui_link}?id=${user.id}&token=${accessToken}`
      sendMail()
      console.log(restUILink)

}


export const authServices = {
  LoginUser,
  refreshToken,
  changePassword,
  forgetPassword
 
};
