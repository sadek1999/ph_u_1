import express from 'express'
import { studentControllers } from './student.controller'

const router=express.Router()

router.post('/crate-student',studentControllers.createStudent)
router.get('/',studentControllers.getAllStudents)
router.get("/:studentId",studentControllers.getSingleStudent)

export const studentRoutes=router