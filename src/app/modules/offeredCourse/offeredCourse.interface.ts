import { Types } from "mongoose"

export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TOfferedCourse={
    semesterRegistration:Types.ObjectId,
    academicDepartment:Types.ObjectId;
    academicFaculty:Types.ObjectId;
    academicSemester:Types.ObjectId;
    course:Types.ObjectId;
    faculty:Types.ObjectId;
    maxCapacity:number;
    section:number;
    days:TDays[];
    startTime:string;
    endTime:string

}