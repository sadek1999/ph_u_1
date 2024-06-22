import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartment } from "./academicDepartment.model";



const createAcademicDepartmentIntoDB=async(payload:TAcademicDepartment)=>{
    const result=await academicDepartment.create(payload)
    return result;
}

const getAllAcademicDepartmentFromDB=async()=>{
    const result=await academicDepartment.find();
    return result;
}

const getSingleAcademicDepartmentFromDB=async(id:string)=>{
    const result=await academicDepartment.findById({id});
    return result;
}

const updateSingleAcademicDepartmentFromDB=async(id:string,payload:Partial<TAcademicDepartment>)=>{

    const result=await academicDepartment.updateOne({_id:id},payload,{new:true})
    return result
}

export const academicDepartmentServices={
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateSingleAcademicDepartmentFromDB
}