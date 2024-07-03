import express from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
  "/academic-faculty",
  // ValidateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.creteAcademicFaculty
);

router.get("/", academicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

// router.get('/:semesterId',academicSemesterControllers.getSingleAcademicSemester)

router.patch(
  "/:facultyId",
  ValidateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyController.updateAcademicFaculty
);

export const academicFacultyRouter = router;
