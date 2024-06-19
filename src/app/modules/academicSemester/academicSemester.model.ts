import { Schema, model } from "mongoose";
import {
  TAcademicSemester,
  
} from "./academicSemeste.interface";
import { SemesterCode, SemesterName, months } from "./academicSemester.const";



const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true ,enum:SemesterName },
  code: { type: String, required: true ,enum:SemesterCode },
  year: { type: Date, required: true },
  startMonth: { type: String, enum: months },
  endMonth: { type: String, enum: months },
});



export const academicSemester=model<TAcademicSemester>('academicSemester',academicSemesterSchema)