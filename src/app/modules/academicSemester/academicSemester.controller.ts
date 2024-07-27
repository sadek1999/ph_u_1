import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { academicSemesterServices } from "./academicSemester.service";

const cerateAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully create student",
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all semester get successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await academicSemesterServices.getSingleSemesterFromDB(
    semesterId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get single semester successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );
  // return result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully update a semester",
    data: result,
  });
});

export const academicSemesterControllers = {
  cerateAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
