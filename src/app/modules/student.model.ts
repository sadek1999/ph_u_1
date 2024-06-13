import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student/student.interface";
import config from "../../config";
import { boolean } from "zod";


// Define the schemas
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  meddleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContact: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true },
  user:{type:Schema.Types.ObjectId , required:true,unique:true,ref:'User'},

  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  email: { type: String, required: true },
  dateOfBarth: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  contactNO: { type: String, required: true },
  EmergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String, required: true },
  
  isDelated:{type:Boolean, default:false}
},{
  toJSON:{
    virtuals:true
  }
});

// virtual

studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName}  ${this.name.meddleName}  ${this.name.lastName}`
})

// Pre  mongoose hook

// studentSchema.pre("save",async function (next) {
//   let  user=this;
//   user.password=await bcrypt.hash(user.password,Number(config.saltRound));
//   next()
// });

// post mongoose hook/middleware

// studentSchema.post("save", function (doc,next) {
//   doc.password=''
//   console.log( "from post hook");
//   next()
// });

studentSchema.pre("find",async function (next) {
  
  this.find({isDelated:{$ne:true}})
  next()
})

studentSchema.pre('findOne',async function (next) {
  this.find({isDelated:{$ne:true}})
  next()
})

studentSchema.pre('aggregate',async function (next) {
  this.pipeline().unshift({$match:{isDelated:{$ne:true}}})
  next()
})


// creating a custom static

studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// studentSchema.methods.isUserExist=async function (id:string) {
//   const userExist =await Student.findOne({id})
// return userExist;

// }

export const Student = model<TStudent, StudentModel>("student", studentSchema);
