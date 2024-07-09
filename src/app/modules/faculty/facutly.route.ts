
import  express  from 'express';
import { facultyControllers } from './faculty.controller';

const router=express.Router();

router.get('/',facultyControllers.getAllFaculty)
router.get("/:facultyId",facultyControllers.getSingleFaculty)
router.delete('/:facultyId',facultyControllers.deleteSingleFaculty)
router.patch('/:facultyID',facultyControllers.updateFaculty)
export const FacultyRouter= router