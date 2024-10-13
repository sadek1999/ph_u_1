import QueryBuilder from "../../builder/QueryBuilder";
import { TAcademicSemester } from "./academicSemeste.interface";
import { academicSemesterNameCodeMapper, AcademicSemesterSearchableFields } from "./academicSemester.const";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] != payload.code) {
    throw new Error("Invalid Semester code ");
  }

  const result = AcademicSemester.create(payload);
  return result;
};

const getAllSemestersFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  const result= await academicSemesterQuery.modelQuery;
  const meta=await academicSemesterQuery.countTotal();
  return{
    result,
    meta
  }
};

const getSingleSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.code &&
    payload.name &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("invalid semester code and Name");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
