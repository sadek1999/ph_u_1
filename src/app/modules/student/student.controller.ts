import { Request, Response } from "express";
import { studentService } from "./student.service";
import studentValidationSchema from "./student.valiation";


const createStudent=async(req :Request,res:Response)=>{
            
  try{
    const{student :studentData}=req.body;
    // will call service function
    

    const zodparsedData=studentValidationSchema.parse(studentData);
    const result=await studentService.createStudentIntoDB(zodparsedData);

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

const getAllStudents=async(req:Request,res:Response)=>{
  try{
    const result=await studentService.getAllStudentsFromDB()

    res.status(200).json({
      success:true,
      massage:'successfully find all students',
      data:result
  })

  }catch(err){
    res.status(500).json({
      success:false,
      massage:'sumThink want wrong',
      error:err
    })
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
  }catch(err :any){
    res.status(500).json({
      success:false,
      massage:err.massage || 'sumThing want wrong',
      error:err
    })
}
}
const deleteSingleStudent=async(req:Request,res:Response)=>{
  try{
    const{studentId}=req.params;
    const result =await studentService.delateStudentFromDB(studentId)

    res.status(200).json({
      success:true,
      massage:"Delete student from DB",
      data:result
    })
  }catch(err:any){
    res.status(500).json({
      success:false,
      massage:err.massage||'sumthink want wrong',
      error:err
    })
  }
}


export const studentControllers={
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent
}
