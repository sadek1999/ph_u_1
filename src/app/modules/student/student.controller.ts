import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import studentValidationSchema from "./student.valiation";




const getAllStudents=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const result=await studentService.getAllStudentsFromDB()

    res.status(200).json({
      success:true,
      massage:'successfully find all students',
      data:result
  })

  }catch(err){
    // res.status(500).json({
    //   success:false,
    //   massage:'sumThink want wrong',
    //   error:err
    // })
    next(err)
  }
}

const getSingleStudent=async(req:Request,res:Response ,next:NextFunction)=>{
  try{
   const {studentId}=req.params ;
   const result=await studentService.getSingleStudentFromDB(studentId);
   
   res.status(200).json({
    success:true,
    massage:"Get a student by Id",
    data:result
   })
  }catch(err :any){
    // res.status(500).json({
    //   success:false,
    //   massage:err.massage || 'sumThing want wrong',
    //   error:err
    // })
    next(err)
}
}
const deleteSingleStudent=async(req:Request,res:Response ,next:NextFunction)=>{
  try{
    const{studentId}=req.params;
    const result =await studentService.delateStudentFromDB(studentId)

    res.status(200).json({
      success:true,
      massage:"Delete student from DB",
      data:result
    })
  }catch(err:any){
    // res.status(500).json({
    //   success:false,
    //   massage:err.massage||'sumthink want wrong',
    //   error:err
    // })
    next(err)
  }
}


export const studentControllers={
    
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent
}
