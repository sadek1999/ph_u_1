import { TAcademicSemester } from "./academicSemeste.interface";
import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { academicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] != payload.code) {
    throw new Error("Invalid Semester code ");
  }

  const result = academicSemester.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
