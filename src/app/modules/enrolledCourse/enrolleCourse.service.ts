import httpStatus from "http-status";
import appError from "../../error/appError";
import { OfferedCourse } from "../offeredCourse/offeredCoures.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { Student } from "../student/student.model";
import { EnrolledCourse } from "./enrolledCoures.model";

import mongoose from "mongoose";
import { Course } from "../corse/corse.mode";

import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";

import { Faculty } from "../faculty/faculty.model";

const enrolledCoursesCrete = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  // console.log(userId,payload)
  const { offeredCourse } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  const student = await Student.findOne({ id: userId }, { _id: 1 });
  const course = await Course.findById(isOfferedCourseExist?.course);

  if (!isOfferedCourseExist) {
    throw new appError(httpStatus.NOT_FOUND, "offeredCourse not found");
  }
  if (isOfferedCourseExist.maxCapacity == 0) {
    throw new appError(
      httpStatus.NOT_FOUND,
      "The class room is full of students"
    );
  }

  if (!student) {
    throw new appError(httpStatus.NOT_FOUND, "offeredCourse not found");
  }
  const isStudentAlreadyExist = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyExist) {
    throw new appError(httpStatus.CONFLICT, "Student already exists");
  }
  const maxCapacity = isOfferedCourseExist.maxCapacity;

  const maxCredits = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration
  ).select("maxCredit");

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  if (
    totalCredits &&
    maxCredits &&
    totalCredits + course?.credits > maxCredits
  ) {
    throw new appError(httpStatus.BAD_REQUEST, "you have exceeded max credits");
  }
  // console.log(totalCredits);

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

  // return null;
};

const enrolledCourseMarksUpdates = async (
  payload: Partial<TEnrolledCourse>,
  id: string
) => {
  // console.log(payload,id)
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExist = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExist) {
    throw new appError(httpStatus.NOT_FOUND, "semester is not exist");
  }

  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExist) {
    throw new appError(httpStatus.NOT_FOUND, "offered course is not exist");
  }
  const isStudentExist = await Student.findById(student);
  if (!isStudentExist) {
    throw new appError(
      httpStatus.NOT_FOUND,
      "the student can't enroll the course"
    );
  }
  const facultyId = await Faculty.findOne({ id },{_id:1});
  if(!facultyId){
    throw new appError(httpStatus.NOT_FOUND,"faculty is not found")
  }
  // const faculty=facultyId._id.toString()

  const isFacultyBelowTheCourse=await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
   Faculty:facultyId._id
  })
  if(!isFacultyBelowTheCourse){
    throw new appError(httpStatus.UNAUTHORIZED,'you are unauthorized')
  }
  console.log(isFacultyBelowTheCourse)
  // const a=await EnrolledCourse.findOne({student})
  // console.log(a)

  // console.log(isOfferedCourseExist.faculty,faculty._id)
  
};
export const enrolledCourseServices = {
  enrolledCoursesCrete,
  enrolledCourseMarksUpdates,
};
