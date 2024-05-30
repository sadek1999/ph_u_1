import { Request, Response } from "express";
import { studentService } from "./student.service";


const createStudent=async(req :Request,res:Response)=>{
            
  try{
    const{student :studentData}=req.body;
    // will call service function
    const result=await studentService.createStudentIntoDB(studentData);

    res.status(200).json({
        success:true,
        massage:'successfully create student',
        data:result
    })
  }
  catch(err){
    console.log(err)
  }
    
}



export const studentControllers={
    createStudent
}




