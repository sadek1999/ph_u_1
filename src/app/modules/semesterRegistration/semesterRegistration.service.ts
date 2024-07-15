import httpStatus from "http-status";
import appError from "../../error/appError";

import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const cerateSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  const isAcademicSemesterExists = await academicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new appError(httpStatus.NOT_FOUND, "Academic Semester is not found");
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new appError(httpStatus.CONFLICT, "This Semester already registered");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  
  const SemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query
  ).filter().sort().paginate().fields();

  const result = await SemesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFormDB=async(id:string)=>{
    const result=await SemesterRegistration.findById(id)
    return result
}
const updateSemesterRegistrationIntoDB=async(id:string,payload:Partial<TSemesterRegistration>)=>{

}

export const semesterRegistrationServices = {
  cerateSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationsFormDB,
  updateSemesterRegistrationIntoDB,
};
