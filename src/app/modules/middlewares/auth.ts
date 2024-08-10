import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utility/catchAsync";
import appError from "../../error/appError";
import httpStatus from "http-status";
import jwt, {  JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import { TUserRole } from "../user/user.interface";

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
        const role=decoded .role 
        if(requiredRoles && !requiredRoles.includes(role)){
            throw new appError(
                httpStatus.UNAUTHORIZED,
                "you are unauthorize user"
              );  
        }
        req.user=decoded 
        // console.log(decoded);
        // decoded undefined
        next();
    

    // jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decoded) {
    //     // if (err) {
    //     //   throw new appError(
    //     //     httpStatus.UNAUTHORIZED,
    //     //     "you are unauthorize user"
    //     //   );
    //     // }
    //     // err
    //     const role=(decoded as JwtPayload).role 
    //     if(requiredRoles && !requiredRoles.includes(role)){
    //         throw new appError(
    //             httpStatus.UNAUTHORIZED,
    //             "you are unauthorize user"
    //           );  
    //     }
    //     req.user=decoded as JwtPayload
    //     // console.log(decoded);
    //     // decoded undefined
    //     next();
    //   }
    // );
   
  });
};

export default auth;
