import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.const";


export const semesterRegistrationValidationSchema=z.object({
    body:z.object({
        academicSemester:z.string(),
    
        status:z.enum([...(SemesterRegistrationStatus as  [string , ...string[]])]),
        startDate:z.string().datetime(),
        endDate:z.string().datetime(),
       
        maxCredit:z.number(),
        minCredit:z.number()
    })
})