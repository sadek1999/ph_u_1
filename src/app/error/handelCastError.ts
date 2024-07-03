import mongoose from "mongoose";
import { TErrorSources, TGeneralErrorResponse } from "../interface/error";

const handelCastError = (
  err: mongoose.Error.CastError
): TGeneralErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statsCode = 400;
  return {
    statsCode,
    message: "Invalid ",
    errorSources,
  };
};

export default handelCastError;
