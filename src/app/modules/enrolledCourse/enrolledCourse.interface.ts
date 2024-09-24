import { Types } from "mongoose"

export type TGrad='A' | 'B' | 'C' | 'D' | 'F' | 'NA'
export type TCourseMark={
    quiz_1:number,
    mid:number,
    quiz_2:number,
    final:number
}

export type TEnrolledCourse={
    semesterRegistration:Types.ObjectId;
    academicSemester:Types.ObjectId;
    academicFaculty:Types.ObjectId;
    academicDepartment:Types.ObjectId;
    offeredCourse:Types.ObjectId;
    course:Types.ObjectId;
    student:Types.ObjectId;
    Faculty:Types.ObjectId;
    isEnrolled:boolean;
    courseNumber:TCourseMark;
    grad:TGrad
    gradePoint:number
    isCompleted:boolean
}