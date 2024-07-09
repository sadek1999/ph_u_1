
import { UserServices } from "./user.service";
import sendResponse from "../../utility/sandResponse";
import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";



const createStudent =catchAsync( async (req, res) => {
 
    const { password, student: studentData } = req.body;

   
    //   const result=await studentService.createStudentIntoDB(zodparsedData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: "successfully create student",
      data: result,
    });
 
})

const createFaculty=catchAsync(async(req,res)=>{
  const {password,faculty:facultyData}=req.body;
  // console.log(req.body)

   const result=await UserServices.createFacultyIntoDB(password,facultyData)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    massage:'successfully create Faculty',
    data:result
   })
})

export const UserControllers = {
  createStudent,
  createFaculty
};
