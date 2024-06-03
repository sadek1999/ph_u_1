import { Model } from "mongoose";

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContact: string;
  
    motherName: string;
    motherOccupation: string;
    motherContact: string;
  };
  
  export type TLocalGuardian = {
    name: string;
   
    contact: string;
    address: string;

  };
  
  export type TUserName = {
    firstName: string;
    meddleName?: string;
    lastName: string;
  };
  
  export type TStudent = {
    id: string;
    name: TUserName;
    gender: 'male' | 'female';
    email: string;
    dateOfBarth:string;
    contactNO: string;
    EmergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked';
  };
  

  export type StudentMethods={
    isUserExist(id:string):Promise<TStudent |null>
  }

export  type StudentModels = Model<TStudent, {}, StudentMethods>;