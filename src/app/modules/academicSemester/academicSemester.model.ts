import { Schema, model } from "mongoose";
import {
  TAcademicSemester,
  TMonths as TMonths,
} from "./academicSemeste.interface";

const months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  year: { type: Date, required: true },
  startMonth: { type: String, enum: months },
  endMonth: { type: String, enum: months },
});



export const academicSemester=model<TAcademicSemester>('academicSemester',academicSemesterSchema)