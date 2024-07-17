import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { offeredCourseServices } from "./offeredCourse.service";


const createOfferedCourse=catchAsync(async(req,res)=>{
    const result=await offeredCourseServices.createOfferedCourseIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:"successfully create OfferedCourse",
        data:result
    })
})

const getAllOfferedCourse=catchAsync(async(req,res)=>{
    const result=await offeredCourseServices.getAllOfferedCourseFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:"successfully get all  OfferedCourse",
        data:result
    })
})

const getSingleOfferedCourse=catchAsync(async(req,res)=>{
    const{id}=req.params;
    const result= await offeredCourseServices.getSingleOfferedCourseFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:"successfully  get the OfferedCourse",
        data:result
    })
})

const DeleteOfferedCourse=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result= await offeredCourseServices.DeleteOfferedCourseFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:"successfully Delete the  OfferedCourse",
        data:result
    })
})

const updateOfferedCourse=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result= await offeredCourseServices.updateOfferedCourseIntoDB(id,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:"successfully Update the  OfferedCourse",
        data:result
    })
})

export const offeredCourseController={
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    DeleteOfferedCourse,
    updateOfferedCourse
}