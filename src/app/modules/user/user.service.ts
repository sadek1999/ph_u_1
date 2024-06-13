import { object } from "zod";
import config from "../../../config";
import { TStudent } from "../student/student.interface";
import {  TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDB = async (password:string,studentData: TStudent) => {
    // if (await Student.isUserExist(studentData.id)) {
    //   throw new Error("your are alrady Exists");
    // }
    const userData:Partial<TUser>={}

     userData.password=password || (config.default_password as string)
     userData.role='student'
     userData.id='2030100001'
  
    const result = await User.create(userData);

    if(Object.keys(result).length){
        // set id and _id;
        studentData.id = result.id;
        studentData.user= result._id;
    }
    // const student = new Student(studentData);
  
    // const result = await student.save();
  
    return result;
  };

  export const UserServices={
    createStudentIntoDB
  }