import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../../interface/error";
import config from "../../../config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statsCode = err.statusCode || 500;
  let message = err.message || "sumThink want wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "sumThink want wrong",
    },
  ];

  const handelZodError = (err: ZodError) => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path.length - 1],
        message: issue?.message,
      };
    });

    const statsCode = 400;
    return {
      statsCode,
      message: " validation Error",
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);
    // console.log(simplifiedError)
    statsCode = simplifiedError.statsCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(statsCode).json({
    success: false,
    message,
    errorSources,
    stack:config.node_dev=="development"? err?.stack : null
  });
};
