
import express  from 'express';

import { adminController } from './admin.controller';


const router=express.Router()

router.get('/',adminController.getAllAdmins)
router.get("/:adminId",adminController.getSingleAdmin)
router.delete("/:adminId",adminController.deleteAdmin)
router.patch("/:adminId",adminController.updateAdmin)

export const adminRouter=router