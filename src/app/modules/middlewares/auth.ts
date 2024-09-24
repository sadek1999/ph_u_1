import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utility/catchAsync";
import appError from "../../error/appError";
import httpStatus from "http-status";
import jwt, {  JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import { TUserRole } from "../user/user.interface";
import { User } from "../user/user.model";

const auth = (...requiredRoles :TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //   validation
    const token = req.headers.authorization;
    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, "You are  unauthorize user");
    }
    // Verified Token

      const decoded = jwt.verify(token,
        config.jwt_access_secret as string) as JwtPayload;
        const{role,userId,iat}=decoded
        

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
        
        if(requiredRoles && !requiredRoles.includes(role)){
            throw new appError(
                httpStatus.UNAUTHORIZED,
                "you are unauthorize user"
              );  
        }
        req.user=decoded 
        
        next();
    

   
   
  });
};

export default auth;
