import { Request, Response } from "express";
import { UserServices } from "./user.service";


const createStudent=async(req :Request,res:Response)=>{
            
    try{
      const{password,student :studentData}=req.body;
      // will call service function
      
  
    //   const zodparsedData=studentValidationSchema.parse(studentData);
    //   const result=await studentService.createStudentIntoDB(zodparsedData);
    const result =await UserServices.createStudentIntoDB(password,studentData)
  
      res.status(200).json({
          success:true,
          massage:'successfully create student',
          data:result
      })
    }
    catch(err :any){
      res.status(500).json({
        success:false,
        massage:err.massage || 'sumThing want wrong',
        error:err
      })
    }
      
  }

  export const UserControllers={
    createStudent
  }