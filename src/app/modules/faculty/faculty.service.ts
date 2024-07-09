import mongoose from "mongoose";
import { Faculty } from "./faculty.model";
import { AnyZodObject } from "zod";
import appError from "../../error/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllFacultyFromDB = async () => {
  const result = await Faculty.find();
  return result;
};
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};
const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteFaculty) {
      throw new appError(httpStatus.BAD_REQUEST, "Field to Delete Faculty");
    }

    const userId = deleteFaculty.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if(!deleteUser){
        throw new appError(httpStatus.BAD_REQUEST,'Field to Delete user')
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err);
  }
};

export const facultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB
};
