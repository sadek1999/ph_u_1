import { TAcademicSemester } from "./academicSemeste.interface";
import { academicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB=async(payload:TAcademicSemester)=>{

    const result=academicSemester.create(payload);
    return result;
}

export const academicSemesterServices={
    createAcademicSemesterIntoDB
}