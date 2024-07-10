import mongoose from "mongoose";
import { Admin } from "./admin.model";

import appError from "../../error/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TAdmin } from "./admin.interface";


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

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const adminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB
};
