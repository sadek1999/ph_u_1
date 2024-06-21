import { TAcademicSemester } from "../academicSemester/academicSemeste.interface";
import { User } from "./user.model";

const getLastStudent=async()=>{
     const lastStudent=await User.findOne(
          {
               role:'student'
          },{
               id:1,
               _id:0
          }
     ).lean();
}



  export   const generateStudentId=(payload:TAcademicSemester)=>{

     const currentId=(0).toString();
     let incrementId= (Number(currentId) +1).toString().padStart(4,'0');
     incrementId=`${payload.year}${payload.code}${incrementId}`;
     return incrementId;

     }