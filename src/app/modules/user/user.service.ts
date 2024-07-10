import config from "../../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";

import { academicSemester } from "../academicSemester/academicSemester.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utility";
import mongoose from "mongoose";
import appError from "../../error/appError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { academicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.role = "Faculty";
  userData.password = password || (config.default_password as string);

  const AcademicDepartment = await academicDepartment.findById(
    payload.academicDepartment
  );
  if (!AcademicDepartment) {
    throw new appError(400, "academic Department is not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });
    // console.log(newUser)
    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Field to create user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Field to create Faculty");
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.role = "admin";
  userData.password = password || (config.default_password as string);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Field to crate User");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Field to create Admin");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("cant create Admin");
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
