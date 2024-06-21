import { Router } from "express";

import { studentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { semesterRouter } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";


const router= Router()

const moduleRoutes=[
    {
        path:"/users",
        route:UserRoutes
    },
    {
      path:"/students",
      route:studentRoutes
    },
    {
      path:"/academic-semesters",
      route:semesterRouter
    },
    {
      path:"/academic-faculty",
      route:academicFacultyRouter
    },

]


moduleRoutes.forEach((route)=>router.use(route.path,route.route))




export default router