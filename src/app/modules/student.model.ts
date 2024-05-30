import { Schema, model } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, TUserName } from "./student/student.interface";


const userNameSchema =new Schema<TUserName>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  })

  const guardianSchema=new Schema<TGuardian>({
    fatherName: { type: String, required: true },
    fatherContact: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherContact: { type: String, required: true },
    motherOccupation: { type: String, required: true },
 } )

 const localGuardianSchema=new Schema<TLocalGuardian>({
    name:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:String,required:true}
  })


const studentSchema = new Schema<TStudent>({
  id: { type: String, required: true },
  name: userNameSchema,
  gender: {
    value: ["male", "female"],
    required: true,
  },
  email: { type: String, required: true },
  dateOfBarth: { type: String, required: true },
  bloodGroup: {
    value: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  contactNO: { type: String, required: true },
  EmergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian:localGuardianSchema,
  profileImg:{type:String,required:true},
  isActive:{
    value:['active','inActive']
  }
});

export  const studentModel=model<TStudent>('student',studentSchema)
