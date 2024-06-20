import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { academicSemesterServices } from "./academicSemester.service";


const cerateAcademicSemester=catchAsync(async(req,res)=>{
    const result=await academicSemesterServices.createAcademicSemesterIntoDB(req.body);


sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully create student",
    data: result,
  });
})

export const academicSemesterControllers={
    cerateAcademicSemester,
}