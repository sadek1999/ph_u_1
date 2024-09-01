import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { facultyServices } from "./faculty.service";

const getAllFaculty = catchAsync(async (req, res) => {
  // console.log(req.cookies)
  const result = await facultyServices.getAllFacultyFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully find all faculty",
    data: result,
  });
});
const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await facultyServices.getSingleFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully get single Faculty",
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully Delete Faculty ",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyID } = req.params;
  // console.log(req.params,facultyId)
  const result = await facultyServices.updateFacultyIntoDB(facultyID, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully update Faculty",
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  deleteSingleFaculty,
  updateFaculty,
};
