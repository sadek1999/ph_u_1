import express from "express";
import ValidateRequest from "../middlewares/validateRequest";
import {
  ChangeLoginPasswordUserValidation,
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

export const AuthRoute = router;
