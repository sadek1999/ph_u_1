
import  express  from 'express';
import ValidateRequest from '../middlewares/validateRequest';
import { ChangeLoginPasswordUserValidation, LoginUserValidation } from './auth.validation';
import { authController } from './auth.controllers';

const router=express.Router();

router.post('/login',ValidateRequest(LoginUserValidation),authController.LoginUser)
router.post('/ change-login-password',ValidateRequest(ChangeLoginPasswordUserValidation),authController.LoginUser)

export const AuthRoute=router;