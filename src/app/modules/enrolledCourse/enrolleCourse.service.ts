import httpStatus from "http-status";
import appError from "../../error/appError";
import { OfferedCourse } from "../offeredCourse/offeredCoures.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { Student } from "../student/student.model";
import { EnrolledCourse } from "./enrolledCoures.model";
import { offeredCourseController } from "../offeredCourse/offeredCourse.controller";
import app from "../../../app";
import mongoose from "mongoose";

const enrolledCoursesCrete = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  // console.log(userId,payload)
  const { offeredCourse } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new appError(httpStatus.NOT_FOUND, "offeredCourse not found");
  }
  if (isOfferedCourseExist.maxCapacity == 0) {
    throw new appError(
      httpStatus.NOT_FOUND,
      "The class room is full of students"
    );
  }
  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new appError(httpStatus.NOT_FOUND, "offeredCourse not found");
  }
  const isStudentAlreadyExist = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyExist) {
    throw new appError(httpStatus.CONFLICT, "Student already exists");
  }
  const maxCapacity = isOfferedCourseExist.maxCapacity;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist.semesterRegistration,

          academicSemester: isOfferedCourseExist.academicSemester,
          academicFaculty: isOfferedCourseExist.academicFaculty,

          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse,
          course: isOfferedCourseExist.course,
          student: student._id,
          Faculty: isOfferedCourseExist.faculty,
          isEnrolled: true,
        },
      ],
      { session }
    );

    const updateCapacity = await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      {
        maxCapacity: maxCapacity - 1,
      },
      { session, new: true }
    );
    if (!updateCapacity) {
      throw new appError(
        httpStatus.FAILED_DEPENDENCY,
        "failed to update capacity"
      );
    }
    
    await session.commitTransaction();
    await session.endSession();
    return result;

  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }

  //  console.log(maxCapacity)

 
  // return null
};

const enrolledCourseUpdates = async () => {};
export const enrolledCourseServices = {
  enrolledCoursesCrete,
  enrolledCourseUpdates,
};
