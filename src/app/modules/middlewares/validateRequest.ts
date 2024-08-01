import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../../utility/catchAsync";


const ValidateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      //   validation
     
        await schema.parseAsync({ body: req.body });
        next();
     
    });
  };

  export default ValidateRequest;