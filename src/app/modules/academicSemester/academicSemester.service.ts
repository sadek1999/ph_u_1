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

const getAllSemestersFromDB=async()=>{
  const result=await academicSemester.find()
  return result;
}

const getSingleSemesterFromDB=async(id:string)=>{
  const result=await academicSemester.findById(id);
  return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
};
