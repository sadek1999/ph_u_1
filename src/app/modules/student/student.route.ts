import express from "express";
import { studentControllers } from "./student.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.valiation";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

// router.post('/crate-student',studentControllers.createStudent)
router.get("/", studentControllers.getAllStudents);
router.get("/:studentId", auth(),studentControllers.getSingleStudent);
router.patch(
  "/:studentId",auth(),
  ValidateRequest(updateStudentValidationSchema),
  studentControllers.updateSingleStudent
);
router.delete("/:studentId", auth(USER_ROLE.admin),studentControllers.deleteSingleStudent);

export const studentRoutes = router;
