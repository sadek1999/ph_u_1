import { TLoginUser } from "./auth.interface";


const LoginUser= async(payload:TLoginUser)=>{
    console.log(payload)
}

export const authServices={
  LoginUser
}