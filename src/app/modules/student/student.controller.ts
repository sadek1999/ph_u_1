import { Request, Response } from "express";
import { studentService } from "./student.service";


const createStudent=async(req :Request,res:Response)=>{
            
    const student=req.body ;
    // will call service function
    const result=await studentService.createStudentIntoDB(student);

    res.status(200).json({
        success:true,
        massage:'successfully create student',
        data:res
    })
    // send res
}



export const studentControllers={
    createStudent
}




