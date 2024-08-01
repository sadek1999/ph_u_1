import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utility/catchAsync";
import appError from "../../error/appError";
import httpStatus from "http-status";


const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      //   validation
      const token=req.headers.authorization
      if(!token){
        throw new appError(httpStatus.UNAUTHORIZED,'You are authorities user')
      }
    //  console.log(req.headers.authorization)
     next()
        
    });
  };

  export default auth;