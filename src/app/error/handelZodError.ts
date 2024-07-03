import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGeneralErrorResponse } from "../interface/error";
 

const handelZodError = (err: ZodError):TGeneralErrorResponse => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path.length - 1],
        message: issue?.message,
      };
    });

    const statsCode = 400;
  
    return {
    
      statsCode,
      message: " validation Error",
      errorSources,
    };
  };
  
  export default handelZodError;
