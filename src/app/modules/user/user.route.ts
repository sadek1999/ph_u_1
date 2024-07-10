import { UserControllers } from "./user.controller";


import ValidateRequest from "../middlewares/validateRequest";
import express from "express";
import { createStudentValidationSchema } from "../student/student.valiation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";

const router = express.Router();
// console.log('this is user router')

router.post(
  "/create-student",
  ValidateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

router.post('/create-faculty',ValidateRequest(createFacultyValidationSchema),UserControllers.createFaculty)
router.post('/create-admin',ValidateRequest(createAdminValidationSchema),UserControllers.createAdmin)



export const UserRoutes = router;
