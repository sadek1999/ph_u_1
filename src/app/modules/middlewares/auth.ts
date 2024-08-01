import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utility/catchAsync";
import appError from "../../error/appError";
import httpStatus from "http-status";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import config from "../../../config";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //   validation
    const token = req.headers.authorization;
    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, "You are  unauthorize user");
    }
    // Verified Token

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new appError(
            httpStatus.UNAUTHORIZED,
            "you are unauthorize user"
          );
        }
        // err
        req.user=decoded as JwtPayload
        // console.log(decoded);
        // decoded undefined
        next();
      }
    );
   
  });
};

export default auth;
