
import config from "../../../config";
import { TStudent } from "../student/student.interface";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student.model";

import { academicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utility";


const createStudentIntoDB = async (password:string,payload: TStudent) => {
   
    const userData:Partial<TUser>={}

     userData.password=password || (config.default_password as string)
     userData.role='student'
    //  userData.id='2564348'
     

     
     const admissionSemester=await academicSemester.findById(payload.admissionSemester)

     userData.id=generateStudentId(admissionSemester)
  
    const newUser = await User.create(userData);

    if(Object.keys(newUser).length){
        // set id and _id;
        payload.id =newUser.id;
        payload.user=newUser._id;

        const newStudent=await Student.create(payload);
        return newStudent
    }
  
    
  
  
  };

  export const UserServices={
    createStudentIntoDB
  }