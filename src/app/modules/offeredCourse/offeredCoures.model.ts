import mongoose, { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.const";

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicFaculty",
    },
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "semesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      
      ref: "academicSemester",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    maxCapacity: { type: Number, required: true },
    section: { type: Number, required: true },
    days: [{ type: String, enum: Days }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const OfferedCourse = model<TOfferedCourse>(
  "offeredCourse",
  offeredCourseSchema
);
