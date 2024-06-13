import  express from "express"

import { UserControllers } from "./user.controller";

const router=express.Router()
// console.log('this is user router')

router.post("/create-student",UserControllers.createStudent)

export const UserRoutes=router;
