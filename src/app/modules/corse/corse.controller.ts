import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sandResponse";
import { CourseServices } from "./corse.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: 'Course is created successfully',
      data: result,
    });
  });

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: 'Course are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: 'Course is retrieved successfully',
      data: result,
    });
  });
  
  const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: 'course is updated successfully',
      data: result,
    });
  });
  
  const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: 'Course is deleted successfully',
      data: result,
    });
  });
  
  const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: 'Faculties assigned  successfully',
      data: result,
    });
  });
  
  const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      massage: 'Faculties removed  successfully',
      data: result,
    });
  });
  
  export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse,
  };