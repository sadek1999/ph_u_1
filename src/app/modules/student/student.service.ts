import { studentModel } from "../student.model";
import { TStudent } from "./student.interface";


const createStudentIntoDB=async(student:TStudent)=>{
     const result =await studentModel.create(student)
     return result;
}

export const studentService={
    createStudentIntoDB

}

