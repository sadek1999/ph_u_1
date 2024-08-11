
import  express  from 'express';
import { facultyControllers } from './faculty.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router=express.Router();

router.get('/', auth(USER_ROLE.Faculty,USER_ROLE.admin),facultyControllers.getAllFaculty)
router.get("/:facultyId",auth(),facultyControllers.getSingleFaculty)
router.delete('/:facultyId',auth(USER_ROLE.admin),facultyControllers.deleteSingleFaculty)
router.patch('/:facultyID',auth(),facultyControllers.updateFaculty)
export const FacultyRouter= router