import { Router } from "express";

import { studentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";


const router= Router()

router.use('/students',studentRoutes)
router.use('/users',UserRoutes)

// app.use("/api/v1/student", studentRoutes);
// app.use("/api/v1/users", UserRoutes);

export default router