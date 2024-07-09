
import  express  from 'express';
import { facultyControllers } from './faculty.controller';

const router=express.Router();

router.get('/',facultyControllers.getAllFaculty)
router.get("/:facultyId",facultyControllers.getSingleFaculty)
export const FacultyRouter= router