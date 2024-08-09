
import  express  from 'express';
import ValidateRequest from '../middlewares/validateRequest';
import { ChangeLoginPasswordUserValidation, LoginUserValidation } from './auth.validation';
import { authController } from './auth.controllers';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router=express.Router();

router.post('/login',ValidateRequest(LoginUserValidation),authController.LoginUser)
router.post('/change-login-password', auth(USER_ROLE.Faculty,USER_ROLE.admin,USER_ROLE.student),ValidateRequest(ChangeLoginPasswordUserValidation),authController.changePassword)

export const AuthRoute=router;