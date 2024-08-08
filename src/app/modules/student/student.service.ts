import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import mongoose from "mongoose";
import appError from "../../error/appError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.const";

const createStudentIntoDB = async (payload: TStudent) => {
  // console.log(payload)
  if (await Student.isUserExist(payload.id)) {
    throw new Error("your are already Exists");
  }

  const result = await Student.create(payload);
  // const student = new Student(studentData);

  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async (query: Record<string | undefined>) => {
  // const result= await studentQuery.modelQuery;
  // const result = await Student.find()
  //   .populate("admissionSemester")
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   });
  // // console.log(result)
  // return result;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate('user')
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateSingleStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian .${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const delateStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const isDeletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!isDeletedStudent) {
      throw new appError(httpStatus.BAD_REQUEST, "fail to delete Student");
    }

    const isDeletedUser = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!isDeletedUser) {
      throw new appError(httpStatus.BAD_REQUEST, "fail to delete User");
    }

    await session.commitTransaction();
    await session.endSession();

    return isDeletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentIntoDB,
  delateStudentFromDB,
};
