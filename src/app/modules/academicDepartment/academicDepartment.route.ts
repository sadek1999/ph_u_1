import express from "express";

import { academicDepartmentControllers } from "./academicDepartment.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";

const router = express.Router();

router.post(
  "/create-academic-Department",
  ValidateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  academicDepartmentControllers.createAcademicDepartment
);

router.get("/", academicDepartmentControllers.getAllAcademicDepartment);
router.get(
  "/:academicDepartmentId",
  academicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  "/:academicDepartmentId",
  ValidateRequest(
    academicDepartmentValidation.updateAcademicFacultyValidationSchema
  ),
  academicDepartmentControllers.updateSingleAcademicDepartment
);

export const academicDepartmentRouter = router;
