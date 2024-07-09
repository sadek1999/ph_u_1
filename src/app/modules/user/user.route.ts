import { UserControllers } from "./user.controller";


import ValidateRequest from "../middlewares/validateRequest";
import express from "express";
import { createStudentValidationSchema } from "../student/student.valiation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";

const router = express.Router();
// console.log('this is user router')

router.post(
  "/create-student",
  ValidateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

router.post('/create-faculty',ValidateRequest(createFacultyValidationSchema),UserControllers.createFaculty)

export const UserRoutes = router;
