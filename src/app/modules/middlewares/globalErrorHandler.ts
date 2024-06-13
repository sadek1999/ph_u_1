import { NextFunction, Request, Response } from "express";



export const globalErrorHandler= (err:any,req:Request,res:Response,next:NextFunction)=>{

    const statsCode=500;
     const massage= err.massage||'sumThink want wrong';
     return res.status(statsCode).json({
       success:false,
       massage,
       error:err
   
     })
   }