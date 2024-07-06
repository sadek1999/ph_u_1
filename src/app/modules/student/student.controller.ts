
import { studentService } from "./student.service";
import sendResponse from "../../utility/sandResponse";
import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";



const getAllStudents = catchAsync(async (req, res, ) => {
  
  const result = await studentService.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully create student",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully get the student",
    data: result,
  });
});

const updateSingleStudent=catchAsync(async(req,res)=>{
  const {studentId}=req.params
  const {student}=req.body
  const result=await studentService.updateSingleStudentIntoDB(studentId,student)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully update the student",
    data: result,
  });
})
const deleteSingleStudent = catchAsync(
  async (req, res) => {
    // console.log(req.params)
    const { studentId } = req.params;
    const result = await studentService.delateStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: "successfully create student",
      data: result,
    });
  }
);
export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
