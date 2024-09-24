import express from "express";
import { enrolledCourseController } from "./enrolleCourse.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { createEnrolledCourseValidationSchema } from "./enrolledCourse.validation";

const router = express.Router();

router.post(
  "/",
  ValidateRequest(createEnrolledCourseValidationSchema),
  enrolledCourseController.CreateEnrolledCourseIntoDB
);
router.patch("/:id", enrolledCourseController.updateEnrolledCourseIntoDB);
export const enrolledCourseRoute = router;
