import { UserServices } from "./user.service";
import sendResponse from "../../utility/sandResponse";
import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import { userStatus } from "./user.const";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  //   const result=await studentService.createStudentIntoDB(zodparsedData);
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully create student",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  // console.log(req.body)

  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully create Faculty",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully create Admin",
    data: result,
  });
});
const getMe=catchAsync(async(req,res)=>{
  const {userId,role}=req.user
  const result= await UserServices.getMe(userId,role)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully get me",
    data: result,
  });
})

const changeStatus=catchAsync(async(req,res)=>{
  const{id}=req.params
  const result=await UserServices.changeStatus(id,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully change the status ",
    data: result,
  });
})



export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
};
