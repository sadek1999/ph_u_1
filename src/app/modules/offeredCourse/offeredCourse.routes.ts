import express from "express";
import ValidateRequest from "../middlewares/validateRequest";
import { offeredCourseValidationSchema } from "./offeredCourse.validation";
import { offeredCourseController } from "./offeredCourse.controller";

const router = express.Router();

router.post(
  "/Create",
  ValidateRequest(offeredCourseValidationSchema),
  offeredCourseController.createOfferedCourse
);

router.get("/",offeredCourseController.getAllOfferedCourse)
router.get('/:id',offeredCourseController.getSingleOfferedCourse)
router.delete('/:id',offeredCourseController.DeleteOfferedCourse)
router.patch("/:id",offeredCourseController.updateOfferedCourse)

export const OfferedCourseRoute = router;
