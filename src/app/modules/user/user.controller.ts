import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utility/sandResponse";
import httpStatus from "http-status";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    //   const zodparsedData=studentValidationSchema.parse(studentData);
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
  } catch (err: any) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
