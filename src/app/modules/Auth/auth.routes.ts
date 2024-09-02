import express from "express";
import ValidateRequest from "../middlewares/validateRequest";
import {
  ChangeLoginPasswordUserValidation,
  forgetPasswordValidationSchema,
  LoginUserValidation,
  refreshTokenValidation,
} from "./auth.validation";
import { authController } from "./auth.controllers";

const router = express.Router();

router.post(
  "/login",
  ValidateRequest(LoginUserValidation),
  authController.LoginUser
);
router.post(
  "/change-login-password",
  ValidateRequest(ChangeLoginPasswordUserValidation),
  authController.changePassword
);
router.post(
  "/refresh-token",
  ValidateRequest(refreshTokenValidation),
  authController.refreshToken
);

router.post('/forget-password',
  ValidateRequest(forgetPasswordValidationSchema),
  authController.forgetPassword
)

export const AuthRoute = router;
