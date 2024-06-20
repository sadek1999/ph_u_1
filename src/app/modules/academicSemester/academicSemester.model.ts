import { Schema, model } from "mongoose";
import {
  TAcademicSemester,
  
} from "./academicSemeste.interface";
import { SemesterCode, SemesterName, months } from "./academicSemester.const";



const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true ,enum:SemesterName },
  code: { type: String, required: true ,enum:SemesterCode },
  year: { type: String, required: true },
  startMonth: { type: String, enum: months },
  endMonth: { type: String, enum: months },
},{timestamps:true});

academicSemesterSchema.pre('save',async function (next) {
  const isSemesterExists =await academicSemester.findOne({
    name:this.name,
    year:this.year
  })
  if(isSemesterExists){
    throw new Error('Semester is already exist')
  }
  next()
  
})



export const academicSemester=model<TAcademicSemester>('academicSemester',academicSemesterSchema)