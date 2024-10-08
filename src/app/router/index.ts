import { Router } from "express";

import { studentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { semesterRouter } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRouter } from "../modules/faculty/facutly.route";
import { adminRouter } from "../modules/admin/admin.route";

import { CourseRoutes } from "../modules/corse/corse.routes";
import { SemesterRegistrationRouter } from "../modules/semesterRegistration/semesterRegistration.routes";

import { OfferedCourseRoute } from "../modules/offeredCourse/offeredCourse.routes";
import { AuthRoute } from "../modules/Auth/auth.routes";
import { enrolledCourseRoute } from "../modules/enrolledCourse/enrolleCoures.router";


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
    {
      path:"/academic-department",
      route:academicDepartmentRouter
    },
    {
      path:"/faculty",
      route:FacultyRouter,
    },
    {
      path:"/admin",
      route:adminRouter
    }
    ,
    {
      path:"/corse",
      route:CourseRoutes
    },{
      path:'/SemesterRegistration',
      route:SemesterRegistrationRouter
    },{
      path:'/offeredCourser',
      route:OfferedCourseRoute
    },{
      path:"/auth",
      route:AuthRoute
    }
    ,{
      path:"/enrolled-courses",
      route:enrolledCourseRoute
    }

]


moduleRoutes.forEach((route)=>router.use(route.path,route.route))




export default router