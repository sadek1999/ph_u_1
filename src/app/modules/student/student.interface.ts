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

export type TStudent = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };

  gender: "male" | "female";
  email: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  phone: string;
  EmergencyPhone: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian:TLocalGuardian,
};
