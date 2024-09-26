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
const updateEnrolledCourseMarksIntoDB=catchAsync(async(req,res)=>{
    const {userId}=req.user
    const result= await enrolledCourseServices.enrolledCourseMarksUpdates(req.body,userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Enrolled course created successfully",
        data:result
    })
})
export const enrolledCourseController={
    CreateEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB,
}