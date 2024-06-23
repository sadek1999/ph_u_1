import express from "express";
import { studentControllers } from "./student.controller";
import ValidateRequest from "../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.valiation";

const router = express.Router();

// router.post('/crate-student',studentControllers.createStudent)
router.get("/", studentControllers.getAllStudents);
router.get("/:studentId", studentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  ValidateRequest(updateStudentValidationSchema),
  studentControllers.updateSingleStudent
);
router.delete("/:studentId", studentControllers.deleteSingleStudent);

export const studentRoutes = router;
