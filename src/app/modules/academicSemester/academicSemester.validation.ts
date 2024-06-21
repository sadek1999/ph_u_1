

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

const updateAcademicSemesterValidationSchema=z.object({
    body:z.object({
        name:z.enum([...SemesterName]as [string,...string[]]).optional(),
        code:z.enum([...SemesterCode] as [string,...string[]]).optional(),
        year:z.string().optional(),
        startMonth:z.enum([...months] as [string,...string[]]).optional(),
        endMonth:z.enum([...months] as [string, ...string[]]).optional()
    })
})

export const SemesterValidation={
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
}