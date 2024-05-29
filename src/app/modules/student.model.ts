import { Schema } from "mongoose";
import { TStudent } from "./student/student.interface";

const studentSchema=new Schema<TStudent>({
    id:{type:String, required:true},
    name:{
        firstName:{type:String, required:true},
        middleName:{type:String},
        lastName:{type:String,required:true}
    },
    gender:{
        value:['male','female'],
        required:true,
    },
    email:{type:String,required:true},
    dateOfBarth:{type:String,required:true},
    bloodGroup:{
        value:["A+" ,"A-" , "B+" , "B-" , "AB+" , "AB-" , "O+" , "O-"]
    },
    
})