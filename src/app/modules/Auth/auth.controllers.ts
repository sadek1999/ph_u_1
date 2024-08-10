import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { authServices } from "./auth.services";

const LoginUser = catchAsync(async (req, res) => {
  const result = await authServices.LoginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully login user",
    data: result,
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

export const authController = {
  LoginUser,
  changePassword,
};
