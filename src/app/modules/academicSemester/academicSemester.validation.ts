

import {   z } from 'zod';
import { SemesterCode, SemesterName, months } from './academicSemester.const';


const createAcademicSemesterValidationSchema=z.object({
    body:z.object({
         name:z.enum([...SemesterName]as [string,...string[]]),
         code:z.enum([...SemesterCode] as [string,...string[]]),
         year:z.string(),
         startMonth:z.enum([...months] as [string,...string[]]),
         endMonth:z.enum([...months] as [string, ...string[]])
    })
})

export const SemesterValidation={
    createAcademicSemesterValidationSchema
}