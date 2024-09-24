import { UserControllers } from "./user.controller";

import ValidateRequest from "../middlewares/validateRequest";
import express from "express";
import { createStudentValidationSchema } from "../student/student.valiation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../middlewares/auth";
import { USER_ROLE } from "./user.const";
import { StatusValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  ValidateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  ValidateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.post(
  "/create-admin",
  ValidateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

router.patch(
  "/change-status/:id",
  auth("admin"),
  ValidateRequest(StatusValidation),
  UserControllers.changeStatus
);

router.get("/me", auth("admin", "Faculty", "student"), UserControllers.getMe);

export const UserRoutes = router;
