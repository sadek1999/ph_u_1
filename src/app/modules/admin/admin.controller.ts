import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { adminServices } from "./admin.service";

const getAllAdmins=catchAsync(async(req,res)=>{
    const result=await adminServices.getAllAdminFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:'successfully get all admin',
        data:result
    })
})
const getSingleAdmin=catchAsync(async(req,res)=>{
    const {adminId}=req.params;
    const result=await adminServices.getSingleAdminFromDB(adminId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:'successfully get single admin',
        data:result
    })
})
const deleteAdmin=catchAsync(async(req,res)=>{
    const {adminId}=req.params;
    const result= await adminServices.deleteAdminFromDB(adminId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        massage:"successfully delete the admin",
        data:result
    })
})

export const adminController={
    getAllAdmins,
    getSingleAdmin,
    deleteAdmin
}