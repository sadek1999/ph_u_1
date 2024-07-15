import express from "express";
import ValidateRequest from "../middlewares/validateRequest";
import { semesterRegistrationValidationSchema } from "./semesterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  ValidateRequest(semesterRegistrationValidationSchema),
  semesterRegistrationController.createSemesterRegistration
);
router.get('/',semesterRegistrationController.getAllSemesterRegistration)
router.get('/:id',semesterRegistrationController.getSingleSemesterRegistration)
router.patch("/:id",semesterRegistrationController.updateSemesterRegistration)

export const SemesterRegistrationRouter = router;
