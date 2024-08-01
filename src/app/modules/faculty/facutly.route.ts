
import  express  from 'express';
import { facultyControllers } from './faculty.controller';
import auth from '../middlewares/auth';

const router=express.Router();

router.get('/', auth(),facultyControllers.getAllFaculty)
router.get("/:facultyId",facultyControllers.getSingleFaculty)
router.delete('/:facultyId',facultyControllers.deleteSingleFaculty)
router.patch('/:facultyID',facultyControllers.updateFaculty)
export const FacultyRouter= router