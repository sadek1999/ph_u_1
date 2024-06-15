import { Response } from "express";

type TResponse <T>={
    statusCode:number,
    success:boolean,
    massage?:string,
    data:T
}


const sendResponse=<T>(res:Response,data:TResponse<T>)=>{
    res.status(data?.statusCode).json({
      success:data.success,
      massage:data.massage,
      data:data.data
    })
}

export default sendResponse;