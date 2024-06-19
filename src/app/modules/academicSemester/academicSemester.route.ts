import express from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { SemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-semester",
  ValidateRequest(SemesterValidation.createAcademicSemesterValidationSchema),
  academicSemesterControllers.cerateAcademicSemester
);

export const semesterRouter = router;
