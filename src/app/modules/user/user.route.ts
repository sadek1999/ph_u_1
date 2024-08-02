import { UserControllers } from "./user.controller";


import ValidateRequest from "../middlewares/validateRequest";
import express from "express";
import { createStudentValidationSchema } from "../student/student.valiation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../middlewares/auth";
import { USER_ROLE } from "./user.const";

const router = express.Router();
// console.log('this is user router')

router.post(
  "/create-student",auth(USER_ROLE.admin),
  ValidateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

router.post('/create-faculty',ValidateRequest(createFacultyValidationSchema),UserControllers.createFaculty)
router.post('/create-admin',ValidateRequest(createAdminValidationSchema),UserControllers.createAdmin)



export const UserRoutes = router;
