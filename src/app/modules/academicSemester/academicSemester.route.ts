import express from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { SemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-semesters",
  ValidateRequest(SemesterValidation.createAcademicSemesterValidationSchema),
  academicSemesterControllers.cerateAcademicSemester
);

router.get('/',academicSemesterControllers.getAllAcademicSemester)

export const semesterRouter = router;
