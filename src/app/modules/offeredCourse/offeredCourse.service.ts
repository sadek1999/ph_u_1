import httpStatus from "http-status";
import appError from "../../error/appError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface"


const createOfferedCourseIntoDB=async(payload:TOfferedCourse)=>{
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

      const isSemesterRegistrationExist= await SemesterRegistration.findById(semesterRegistration)
     if(!isSemesterRegistrationExist){
        throw new appError(httpStatus.BAD_REQUEST,'This Semester is not Registered')
     }
}

const getAllOfferedCourseFromDB=async()=>{

}

const getSingleOfferedCourseFromDB=async()=>{

}

const DeleteOfferedCourseFromDB=async()=>{

}

const updateOfferedCourseIntoDB=async()=>{

}

export const offeredCourseServices={
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    DeleteOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}