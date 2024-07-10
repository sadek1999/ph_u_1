import mongoose from "mongoose";
import { Admin } from "./admin.model";

import appError from "../../error/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";


const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};
const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedAdmin) {
      throw new appError(httpStatus.BAD_REQUEST, "Admin cant delete");
    }
    const userId = deletedAdmin.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if(!deletedUser){
        throw new appError(httpStatus.BAD_REQUEST,'Field to delete user')
    }
    await session.commitTransaction()
    await session.endSession()
    return deletedAdmin
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error("Admin Cant delete");
  }
};

export const adminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB
};
