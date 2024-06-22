import { NextFunction, Request, Response } from "express";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler= (err:any,req:Request,res:Response,next:NextFunction)=>{

    const statsCode=err.statusCode||500;
     const message= err.message||'sumThink want wrong';
     return res.status(statsCode).json({
       success:false,
       message,
       error:err
   
     })
   }