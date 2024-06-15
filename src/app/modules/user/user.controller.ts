import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utility/sandResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    //   const zodparsedData=studentValidationSchema.parse(studentData);
    //   const result=await studentService.createStudentIntoDB(zodparsedData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    // res.status(200).json({
    //   success: true,
    //   massage: "successfully create student",
    //   data: result,
    // });

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

export const UserControllers = {
  createStudent,
};
