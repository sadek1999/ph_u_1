import { TAcademicFaculty } from "./academicFaculty.interface";
import { Schema, model } from "mongoose";

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: { type: String, required: true, unique: true },
});

export const academicFaculty = model<TAcademicFaculty>(
  "academicFaculty",
  academicFacultySchema
);