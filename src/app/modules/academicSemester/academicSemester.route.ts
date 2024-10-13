import express from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { SemesterValidation } from "./academicSemester.validation";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/create-semesters",
  ValidateRequest(SemesterValidation.createAcademicSemesterValidationSchema),
  academicSemesterControllers.cerateAcademicSemester
);

router.get(
  "/",
  auth("admin"),
  academicSemesterControllers.getAllAcademicSemester
);
router.get(
  "/:semesterId",
  academicSemesterControllers.getSingleAcademicSemester
);
router.patch(
  "/:semesterId",
  ValidateRequest(SemesterValidation.updateAcademicSemesterValidationSchema),
  academicSemesterControllers.updateAcademicSemester
);

export const semesterRouter = router;
