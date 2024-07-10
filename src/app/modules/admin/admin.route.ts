
import express  from 'express';

import { adminController } from './admin.controller';


const router=express.Router()

router.get('/',adminController.getAllAdmins)
router.get("/:adminId",adminController.getSingleAdmin)

export const adminRouter=router