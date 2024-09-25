import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { enrolledCourseServices } from "./enrolleCourse.service";



const CreateEnrolledCourseIntoDB=catchAsync(async(req,res)=>{
    const userId=req.user.userId
    const result= await enrolledCourseServices.enrolledCoursesCrete(userId,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Enrolled course created successfully",
        data:result
    })
})
const updateEnrolledCourseIntoDB=catchAsync(async(req,res)=>{
    const result= await enrolledCourseServices.enrolledCoursesCrete()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Enrolled course created successfully",
        data:result
    })
})
export const enrolledCourseController={
    CreateEnrolledCourseIntoDB,
    updateEnrolledCourseIntoDB,
}