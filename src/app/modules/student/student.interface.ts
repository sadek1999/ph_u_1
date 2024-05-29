import { Schema, model, connect } from "mongoose";

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
  address: string;
  contact: string;
};

export type TUserName={
  firstName: string;
  middleName: string;
  lastName: string;
}
export type TStudent = {
  id: string;
  name: TUserName;

  gender: "male" | "female";
  email: string;
  dateOfBarth:string,
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
contactNO: string;
  EmergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian:TLocalGuardian,
  profileImg:string,
  isActive:'active'|"inActive"
};
