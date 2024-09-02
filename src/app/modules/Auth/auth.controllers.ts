import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { authServices } from "./auth.services";
import config from "../../../config";
import { resetPasswordValidationSchema } from "./auth.validation";

const LoginUser = catchAsync(async (req, res) => {
  const result = await authServices.LoginUser(req.body);
  const {refreshToken,accessToken,needPasswordChange}=result

  res.cookie("refreshToken",refreshToken,{
    secure:config.node_dev=='production',
    httpOnly:true
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully login user",
    data: {
      accessToken,needPasswordChange
    },
  });
});

const changePassword=catchAsync(async(req,res)=>{
  
  const {...passwordData}=req.body
  const result=await authServices.changePassword(req.user,passwordData)
  // console.log(req.user,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully update password user",
    data: result,
  });


})

const refreshToken=catchAsync(async(req,res)=>{
  const {refreshToken}=req.cookies
  // console.log(refreshToken)
const result=await authServices.refreshToken(refreshToken)
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully recreate access token user",
    data: result
  });
})

const forgetPassword=catchAsync(async(req,res)=>{
  const {id}=req.body
  const result =await authServices.forgetPassword(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully recreate access token user",
    data: result
  });
})

const resetPassword=catchAsync(async(req,res)=>{
  // const token=req.headers.authorization
  console.log(req.body,req.headers.authorization)
  const result =await authServices.forgetPassword()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully recreate access token user",
    data: result
  });
})

export const authController = {
  LoginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
 
};

