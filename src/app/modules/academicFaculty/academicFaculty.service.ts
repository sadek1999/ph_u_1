import { TAcademicFaculty } from "./academicFaculty.interface";
import { academicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB=async(payload:TAcademicFaculty)=>{

    const result=await academicFaculty.create(payload)
    return result;

}

const getAllAcademicFacultyFromDB=async()=>{
    const result=await academicFaculty.find()
    return result;
}

const getSingleAcademicFacultyFromDB=async(id:string)=>{
    const result= await academicFaculty.findById(id)
    return result
}

const updateSingleAcademicFacultyIntoDB=async(id:string
    ,payload:Partial<TAcademicFaculty>
)=>{
  const result=await academicFaculty.findOneAndUpdate({_id:id},payload,{new:true})
  return result
}

export const academicFacultyServices={
 createAcademicFacultyIntoDB,
 getAllAcademicFacultyFromDB,
 getSingleAcademicFacultyFromDB,
 updateSingleAcademicFacultyIntoDB
}