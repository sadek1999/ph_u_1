import httpStatus from "http-status";
import appError from "../../error/appError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { AcademicFaculty } from "./../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../corse/corse.mode";
import { Faculty } from "../faculty/faculty.model";
import { OfferedCourse } from "./offeredCoures.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { Query } from "mongoose";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExist = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExist) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      "This Semester is not Registered"
    );
  }
  const academicSemester = isSemesterRegistrationExist?.academicSemester;

  const isAcademicFacultyExist = await AcademicFaculty.findById(
    academicFaculty
  );

  if (!isAcademicFacultyExist) {
    throw new appError(httpStatus.NOT_FOUND, "This Faculty is not found");
  }

  const isAcademicDepartmentExist = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isAcademicDepartmentExist) {
    throw new appError(httpStatus.NOT_FOUND, "This Department is not found");
  }

  const isCourseExist = await Course.findById(course);

  if (!isCourseExist) {
    throw new appError(httpStatus.NOT_FOUND, "This course is not found");
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new appError(httpStatus.NOT_FOUND, "This Faculty is not found");
  }

  const isDepartmentBelongFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  //
  if (!isDepartmentBelongFaculty) {
    throw new appError(
      httpStatus.NOT_FOUND,
      "Academic Department ont Belong to faculty"
    );
  }

  const isOfferedCourseExistWithSameSectionWithFaculty =
    await OfferedCourse.findOne({
      semesterRegistration,
      section,
      faculty,
    });
  console.log(isOfferedCourseExistWithSameSectionWithFaculty);

  if (isOfferedCourseExistWithSameSectionWithFaculty) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      "Offered Course is already Exist with same Section"
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new appError(
      httpStatus.CONFLICT,
      "This faculty is not available in this time chose another time or days"
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string | undefined>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .sort()
    .filter()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async () => {};

const DeleteOfferedCourseFromDB = async () => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new appError(httpStatus.NOT_FOUND, "Offered course not found !");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new appError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  const semesterRegistration = isOfferedCourseExists?.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (semesterRegistrationStatus?.status !== "Upcoming") {
    throw new appError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new appError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  DeleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
