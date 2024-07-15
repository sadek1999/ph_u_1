import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.cerateSemesterRegistrationIntoDB(
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully create SemesterRegistration",
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully get all semester Registration",
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationsFormDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    massage: "successfully get single semester",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body
    );

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      massage:'successfully update semesterRegistration',
      data:result
    })
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
