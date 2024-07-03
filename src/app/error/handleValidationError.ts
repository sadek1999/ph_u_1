import mongoose from "mongoose";
import { TErrorSources, TGeneralErrorResponse } from "../interface/error";

 
 const handelValidationError=(err:mongoose.Error.ValidationError):TGeneralErrorResponse=>{
         const errorSources :TErrorSources=Object.values(err?.errors).map((val:mongoose.Error.ValidatorError |mongoose.Error.CastError)=>{
            return{
                path:val?.path,
                message:val?.message
            }
         })
         const statsCode=400
    return {
        statsCode,
        message:'Validation Error',
        errorSources,
    }
 }

 export default handelValidationError;