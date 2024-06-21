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
     )
     .sort({
          createdAt:-1
     })
     .lean()
     return lastStudent?.id?lastStudent.id.substring(4):undefined
     ;
}



  export   const generateStudentId=async(payload:TAcademicSemester)=>{

     const currentId= await getLastStudent()||(0).toString();
     let incrementId= (Number(currentId) +1).toString().padStart(4,'0');
     incrementId=`${payload.year.substring(2)}${payload.code}${incrementId}`;
     return incrementId;

     }