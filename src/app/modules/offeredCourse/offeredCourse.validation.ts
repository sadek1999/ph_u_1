import { z } from "zod";
import { Days } from './offeredCourse.const';

const timeStringSchema=z.string().refine(
    (time)=>{
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
        return regex.test(time);
    },{
        message: 'Invalid time format , expected "HH:MM" in 24 hours format',
      },
)

 export const offeredCourseValidationSchema=z.object({
    body:z.object({
        semesterRegistration:z.string(),
        academicDepartment:z.string(),
        academicFaculty:z.string(),
        academicSemester:z.string().optional(),
        course:z.string(),
        faculty:z.string(),
        maxCapacity:z.number(),
        section:z.number(),
        days:z.array(z.enum([...Days]as [string ,...string[]])),
        startTime:timeStringSchema,
        endTime:timeStringSchema
        
    })
})