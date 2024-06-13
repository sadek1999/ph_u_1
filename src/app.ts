import express, { Application, Request, Response } from "express";
import cors from "cors";
import { studentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";

import { globalErrorHandler } from "./app/modules/middlewares/globalErrorHandler";
import { notFound } from "./app/modules/middlewares/notFound";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
