import { UserControllers } from "./user.controller";

import createStudentValidationSchema from "../student/student.valiation";
import ValidateRequest from "../middlewares/validateRequest";
import express from "express";

const router = express.Router();
// console.log('this is user router')

router.post(
  "/create-student",
  ValidateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
