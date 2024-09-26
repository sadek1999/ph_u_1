import express from "express";
import { enrolledCourseController } from "./enrolleCourse.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { createEnrolledCourseValidationSchema, updateEnrolledCourseMarksValidationSchema } from "./enrolledCourse.validation";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("student"),
  ValidateRequest(createEnrolledCourseValidationSchema),
  enrolledCourseController.CreateEnrolledCourseIntoDB
);
router.patch(
  "/update-enrolledCourseMarks",
  auth("Faculty"),
  ValidateRequest(updateEnrolledCourseMarksValidationSchema),
  enrolledCourseController.updateEnrolledCourseMarksIntoDB
);
export const enrolledCourseRoute = router;
