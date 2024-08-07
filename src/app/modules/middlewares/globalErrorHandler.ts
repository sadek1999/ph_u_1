import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../../interface/error";
import config from "../../../config";
import handelZodError from "../../error/handelZodError";
import handelValidationError from "../../error/handleValidationError";
import handelCastError from "../../error/handelCastError";
import handelDuplicateError from "../../error/handelDublicError";
import appError from "../../error/appError";

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

  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);

    statsCode = simplifiedError.statsCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handelValidationError(err);
    statsCode = simplifiedError.statsCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handelCastError(err);

    statsCode = simplifiedError.statsCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handelDuplicateError(err);
    // console.log(simplifiedError)
    statsCode = simplifiedError.statsCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof appError) {
    statsCode = err?.statusCode;
    message = err?.name;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.name;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }
  

  return res.status(statsCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.node_dev == "development" ? err?.stack : null,
  });
};
