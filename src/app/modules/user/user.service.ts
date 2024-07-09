import config from "../../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";

import { academicSemester } from "../academicSemester/academicSemester.model";
import { generateFacultyId, generateStudentId } from "./user.utility";
import mongoose from "mongoose";
import appError from "../../error/appError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { academicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";


const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = "student";
  //  userData.id='2564348'

  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Fail to create user");
    }
    // set id and _id;
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new appError(httpStatus.BAD_REQUEST, "fail to create student");
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};


const createFacultyIntoDB=async(password:string,payload:TFaculty)=>{
  const userData:Partial<TUser>={}
  userData.role='Faculty';
  userData.password=password||(config.default_password as string)
  
  const AcademicDepartment=await academicDepartment.findById(payload.academicDepartment)
  if(!AcademicDepartment){
    throw new appError(400,'academic Department is not found')
  }

  userData.id=await generateFacultyId()

  const newUser=await User.create([userData])
  // console.log(newUser)
  if(!newUser.length){
    throw new appError(httpStatus.BAD_REQUEST,'Field to create user')
  }

  payload.id=newUser[0].id;
  payload.user=newUser[0]._id;

  const newFaculty =await Faculty.create([payload])
  if(!newFaculty.length){
    throw new appError(httpStatus.BAD_REQUEST,"Field to create Faculty")
  }
  
  return newFaculty
  


}


const createFacultyIntoDB1 = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  // userData.role = 'faculty';

  // find academic department info
  const AcademicDepartment = await academicDepartment.findById(
    payload.academicDepartment,
  );

  if (!AcademicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  // const session = await mongoose.startSession();

  try {
    // session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create(userData); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create(payload);

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    // await session.commitTransaction();
    // await session.endSession();

    return newFaculty;
  } catch (err: any) {
    // await session.abortTransaction();
    // await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB
};
