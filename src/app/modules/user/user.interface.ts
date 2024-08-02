import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export interface  TUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: "admin" | "student" | "Faculty";
    status: "in-progress" | "block";
    isDeleted: boolean;
  }
  
  export type NewUser = {
    password: string;
    role: string;
    id: string;
  };

 export type TUserRole=keyof typeof USER_ROLE
  
  export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser|null>;
    isPasswordMatch(plainPassword:string,hashPassword:string):Promise<boolean>;
  }