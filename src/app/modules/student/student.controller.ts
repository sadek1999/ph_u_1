import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import sendResponse from "../../utility/sandResponse";
import httpStatus from "http-status";


const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentService.getAllStudentsFromDB();

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      massage:"successfully create student",
      data:result
    })
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      massage:"successfully create student",
      data:result
    })
  } catch (err: any) {
    next(err);
  }
};
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.delateStudentFromDB(studentId);

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      massage:"successfully create student",
      data:result
    });
  } catch (err: any) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
