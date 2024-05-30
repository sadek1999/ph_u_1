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

const getAllStudents=async(req:Request,res:Response)=>{
  try{
    const result=await studentService.getAllStudentsFromDB()

    res.status(200).json({
      success:true,
      massage:'successfully find all students',
      data:result
  })

  }catch(err){
    console.log(err)
  }
}

const getSingleStudent=async(req:Request,res:Response)=>{
  try{
   const {studentId}=req.params ;
   const result=await studentService.getSingleStudentFromDB(studentId);
   
   res.status(200).json({
    success:true,
    massage:"Get a student by Id",
    data:result
   })
  }catch(err){
    console.log(err)
  }
}



export const studentControllers={
    createStudent,
    getAllStudents,
    getSingleStudent,
}




