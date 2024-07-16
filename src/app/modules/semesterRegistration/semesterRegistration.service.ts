import httpStatus from "http-status";
import appError from "../../error/appError";

import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.const";

const cerateSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  const isAnyOngoingOrUpcomingSemester=await SemesterRegistration.findOne({
    $or:[
        {status:RegistrationStatus.Upcoming},
        {status:RegistrationStatus.Ongoing}
    ]
  })
  if(isAnyOngoingOrUpcomingSemester){
    throw new appError(httpStatus.OK,`There is already ${isAnyOngoingOrUpcomingSemester.status} semester `)
  }

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


  const isSemesterRegistrationExists=await SemesterRegistration.findById(id)

  if(!isSemesterRegistrationExists){
    throw new appError(httpStatus.NOT_FOUND,"The semester is not exists ")
  }
  const RequestedStatus=payload?.status
  const currentSemesterStatus=isSemesterRegistrationExists?.status;
  if(currentSemesterStatus=="Ended"){
    throw new appError(httpStatus.BAD_REQUEST,'This semester is already Ended')
  }
  // console.log(RequestedStatus)

  if(currentSemesterStatus==="Upcoming"&& RequestedStatus==="Ended"){
    throw new appError(httpStatus.BAD_REQUEST,`You can't update semester status ${currentSemesterStatus} to ${RequestedStatus}`)
  }

  if(currentSemesterStatus==='Ongoing'&& RequestedStatus==='Upcoming'){
    throw new appError(httpStatus.BAD_REQUEST,`you can't update ${currentSemesterStatus} to ${RegistrationStatus}`)
  }


const result=await SemesterRegistration.findByIdAndUpdate(id,payload,{new:true ,runValidators:true})
return result




}



export const semesterRegistrationServices = {
  cerateSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationsFormDB,
  updateSemesterRegistrationIntoDB,
};
