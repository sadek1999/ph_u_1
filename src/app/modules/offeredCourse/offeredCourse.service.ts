import httpStatus from "http-status";
import appError from "../../error/appError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { AcademicFaculty } from "./../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../corse/corse.mode";
import { Faculty } from "../faculty/faculty.model";
import { OfferedCourse } from "./offeredCoures.model";

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
  const academicSemester=isSemesterRegistrationExist?.academicSemester

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
    _id: academicFaculty,
    academicDepartment,
  });
  if (!isDepartmentBelongFaculty) {
    throw new appError(httpStatus.NOT_FOUND, "");
  }

  const isOfferedCourseExistWithSameSectionWithFaculty =
    await OfferedCourse.findOne({
      semesterRegistration,
      section,
      faculty,
    });

  if (isOfferedCourseExistWithSameSectionWithFaculty) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      "Offered Course is already Exist with same Section"         
    );
  }

  const  assignedSchedules= await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days:{$in:days}
  }).select('days startTime endTime')

  console.log(assignedSchedules)


  const result= await OfferedCourse.create({...payload, academicSemester})
 return result

};

const getAllOfferedCourseFromDB = async () => {};

const getSingleOfferedCourseFromDB = async () => {};

const DeleteOfferedCourseFromDB = async () => {};

const updateOfferedCourseIntoDB = async () => {};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  DeleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
