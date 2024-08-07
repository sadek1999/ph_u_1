import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import appError from "../../error/appError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "academicFaculty" },
  },
  { timestamps: true }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new appError(404, "This Department is already exist");
  }
  next();
});
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new Error("this Department is not Exist in DB");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "academicDepartment",
  academicDepartmentSchema
);
