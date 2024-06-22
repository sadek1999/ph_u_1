import { TAcademicFaculty } from "./academicFaculty.interface";
import { Schema, model } from "mongoose";

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: { type: String, required: true, unique: true },
},{timestamps:true});

academicFacultySchema.pre('save',async function (next) {
  const isAcademicFacultyExist= await academicFaculty.findOne({
    name:this.name
  })
  if(isAcademicFacultyExist){
    throw new Error('This Faculty is already exist ')
  }
  next()
})

academicFacultySchema.pre("findOneAndUpdate",async function (next) {
  const query = this.getQuery();
 const isAcademicFacultyExist=await academicFaculty.findOne(query)
 if(!isAcademicFacultyExist){
  throw new Error('This Academic Faculty is not Exist ')
 }
 next()
  
})

export const academicFaculty = model<TAcademicFaculty>(
  "academicFaculty",
  academicFacultySchema
);
