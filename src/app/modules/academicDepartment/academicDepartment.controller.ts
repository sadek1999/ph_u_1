import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { academicDepartmentServices } from "./academicDepartment.service";



const createAcademicDepartment=catchAsync(async(req,res)=>{

    const result= await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:'Successfully create Department',
        data:result
    })
})

const getAllAcademicDepartment=catchAsync(async(req,res)=>{
    const result=await academicDepartmentServices.getAllAcademicDepartmentFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:'successfully get all Department',
        data:result,
    })
})

const getSingleAcademicDepartment=catchAsync(async(req,res)=>{
    const {DepartmentID}=req.params;
    const result=await academicDepartmentServices.getSingleAcademicDepartmentFromDB(DepartmentID)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:'successfully get single department',
        data:result
    })
})

const updateSingleAcademicDepartment=catchAsync(async(req,res)=>{
    const {DepartmentID}=req.params
    const result=await academicDepartmentServices.updateSingleAcademicDepartmentFromDB(
        DepartmentID,req.body
    )

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:'update academic Department',
        data:result
    })
})


export const academicDepartmentControllers={
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment,
}