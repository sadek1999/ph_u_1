
import  express  from 'express';
import ValidateRequest from '../middlewares/validateRequest';
import { LoginUserValidation } from './auth.validation';
import { authController } from './auth.controllers';

const router=express.Router();

router.post('/login',ValidateRequest(LoginUserValidation),authController.LoginUser)
router.post('/ change-login-password',ValidateRequest(LoginUserValidation),authController.LoginUser)

export const AuthRoute=router;