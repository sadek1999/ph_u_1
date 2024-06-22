import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const creteAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully create academicFaculty",
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully get all faculty",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  
  const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(
    facultyId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully get a single academicFaculty",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServices.updateSingleAcademicFacultyIntoDB(
      facultyId,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully update faculty",
    data: result,
  });
});

export const academicFacultyController = {
  creteAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
