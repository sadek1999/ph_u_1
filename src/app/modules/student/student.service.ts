import { TStudent } from "./student.interface";
import { Student } from "./../student.model";
import mongoose from "mongoose";
import appError from "../../error/appError";
import httpStatus from "http-status";

const createStudentIntoDB = async (payload: TStudent) => {
  if (await Student.isUserExist(payload.id)) {
    throw new Error("your are alrady Exists");
  }

  const result = await Student.create(payload);
  // const student = new Student(studentData);

  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = await Student.findOne({id})
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateSingleStudentIntoDB=async(id:string,payload:Partial<TStudent>)=>{
  
  const result=await Student.findOneAndUpdate({id},payload)
  return result
  

}
const delateStudentFromDB = async (id: string) => {

 const session=await mongoose.startSession()

  try{
    session.startTransaction()
    const isDeletedStudent = await Student.findOneAndUpdate(
      { id },
       { isDeleted: true },
      {new:true,session});
 if(!isDeletedStudent){
  throw new appError(httpStatus.BAD_REQUEST,'fail to delete Student')
 }

 const isDeletedUser=await Student.findOneAndUpdate(
  {id},
  {isDeleted:true},
  {new:true,session}
 )

 if(!isDeletedUser){
  throw new appError(httpStatus.BAD_REQUEST,'fail to delete User')
 }

 await session.commitTransaction()
 await session.endSession()

    return isDeletedStudent ;
  }
  catch(err){
 await session.abortTransaction()
 await session.endSession()
  }

  
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentIntoDB,
  delateStudentFromDB,
};
