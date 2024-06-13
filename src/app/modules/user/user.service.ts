import { object } from "zod";
import config from "../../../config";
import { TStudent } from "../student/student.interface";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student.model";


const createStudentIntoDB = async (password:string,studentData: TStudent) => {
    // if (await Student.isUserExist(studentData.id)) {
    //   throw new Error("your are alrady Exists");
    // }
    const userData:Partial<TUser>={}

     userData.password=password || (config.default_password as string)
     userData.role='student'
     userData.id='2030100001'
  
    const newUser = await User.create(userData);

    if(Object.keys(newUser).length){
        // set id and _id;
        studentData.id =newUser.id;
        studentData.user=newUser._id;

        const newStudent=await Student.create(studentData);
        return newStudent
    }
    // const student = new Student(studentData);
  
    // const result = await student.save();
  
  
  };

  export const UserServices={
    createStudentIntoDB
  }