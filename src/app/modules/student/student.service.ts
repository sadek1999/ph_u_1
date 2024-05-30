import { studentModel } from "../student.model";
import { TStudent } from "./student.interface";


const createStudentIntoDB=async(student:TStudent)=>{
     const result =await studentModel.create(student)
     return result;
}

const getAllStudentsFromDB=async()=>{
    const result=await studentModel.find()
    return result;
}

const getSingleStudentFromDB=async(id:string)=>{
    const result=await studentModel.findOne({id:id})
    return result;
}

export const studentService={
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,

}

