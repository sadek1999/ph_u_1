import { Types } from "mongoose"


export type TSemesterRegistration={
    academicSemester:Types.ObjectId,
    status:"Upcoming"|"Ongoing"|"Ended";
    startDate:Date,
    endDate:Date,
    maxCredit:number
    minCredit:number

}