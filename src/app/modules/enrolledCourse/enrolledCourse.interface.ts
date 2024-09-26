import { Types } from "mongoose"

export type TGrad='A' | 'B' | 'C' | 'D' | 'F' | 'NA'
export type TCourseMark={
    classTest1:number,
    midTerm:number,
    classTest2:number,
    finalTerm:number
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
