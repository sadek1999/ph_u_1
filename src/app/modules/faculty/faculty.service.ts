import mongoose from "mongoose";
import { Faculty } from "./faculty.model";

import appError from "../../error/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { FacultySearchableFields } from "./faculty.const";

const getAllFacultyFromDB = async (query: Record<string | unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find().populate('academicDepartment'), query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await  facultyQuery.modelQuery
  return result;
};
const getSingleFacultyFromDB = async (id: string) => {
  // console.log(id)
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

    if (!deleteUser) {
      throw new appError(httpStatus.BAD_REQUEST, "Field to Delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const updateFacultyIntoDB=async(id:string,payload:Record<string |unknown>)=>{
const {name,...remainingData}=payload;
const modifiedUpdatedData:Record<string|unknown>={
  ...remainingData
}

if (name && Object.keys(name).length) {
  for (const [key, value] of Object.entries(name)) {
    modifiedUpdatedData[`name.${key}`] = value;
  }
}
// console.log(id,modifiedUpdatedData)

const result =await Faculty.findByIdAndUpdate(id,modifiedUpdatedData,{new:true, runValidators:true})
// console.log(result)
return result
}

export const facultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
  updateFacultyIntoDB
};
