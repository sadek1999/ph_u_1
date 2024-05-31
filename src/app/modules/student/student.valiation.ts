import { Schema, model } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, TUserName } from "./student.interface";
import z from "zod"


// Define the schemas
const userNameValidationSchema = z.object({
    firstName:z.string(),
    middleName:z.string(),
    lastName:z.string()
    
})

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherContact: z.string(),
  fatherOccupation:z.string(),
  motherName: z.string(),
  motherContact: z.string(),
  motherOccupation: z.string( ),
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>({
  id: { type: String, required: true },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  email: { type: String, required: true },
  dateOfBarth: { type: String, required: true },
  bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  contactNO: { type: String, required: true },
  EmergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String, required: true },
  isActive: { type: String, enum: ['active', 'inActive'] },
});



