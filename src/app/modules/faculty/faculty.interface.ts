import { Types } from "mongoose"
type TName={
    firstName:string,
    middleName:string,
    lastName:string
}

type TFaculty={
    id:string,
    user:Types.ObjectId,
    name:TName,
    gender:string,
    DateOfBirth:Date,
    email:string,
    contactNo:string,
    emergencyContactNo:string,
    presentAddress:string,
    paramentAddress:string,
    profileImage:string,
    
}