import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statsCode = err.statusCode || 500;
  let message = err.message || "sumThink want wrong";

  type TErrorSources = {
    path: string | number;
    message: string;
  }[];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: "sumThink want wrong",
    },
  ];

  if (err instanceof ZodError) {
    statsCode = 400;
    message = "ami zod error";
  }

  return res.status(statsCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
  });
};
