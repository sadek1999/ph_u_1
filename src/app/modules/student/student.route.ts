import express from 'express'
import { studentControllers } from './student.controller'

const router=express.Router()

router.post('/crate-student',studentControllers.createStudent)

export const studentRoutes=router