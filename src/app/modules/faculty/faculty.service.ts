import { Faculty } from "./faculty.model"



const createFacultyIntoDB=async(payload:string)=>{
    const result=await Faculty.create(payload)
    return result
}

export const facultyServices={
 createFacultyIntoDB
}