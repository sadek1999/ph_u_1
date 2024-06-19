import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentService } from "./student.service";
import sendResponse from "../../utility/sandResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully create student",
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully create student",
    data: result,
  });
});
const deleteSingleStudent: RequestHandler = catchAsync(
  async (req, res, next) => {
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
  deleteSingleStudent,
};
