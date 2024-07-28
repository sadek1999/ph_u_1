import httpStatus from "http-status";
import appError from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import  bcrypt  from 'bcrypt';



const LoginUser= async(payload:TLoginUser)=>{
    // console.log(payload)
    const {id}=payload;

    const isUserExist=await User.findOne({id})
    // console.log(isUserExist)
    if(!isUserExist){
      throw new appError(httpStatus.NOT_FOUND,'This user is not found !!')
    }
    // console.log(isUserExist?.isDeleted)

     if(isUserExist?.isDeleted){
      throw new appError(httpStatus.NOT_FOUND,'This user already Deleted')
    }
    if(isUserExist?.status==="block"){
      throw new appError(httpStatus.FORBIDDEN,'This user block ')
    }

    const passwordCheck=await bcrypt.compare(payload?.password,isUserExist?.password)

    if(!passwordCheck){
      throw new appError(httpStatus.BAD_REQUEST,'password can not match')
    }
    
    return null;
}

export const authServices={
  LoginUser
}