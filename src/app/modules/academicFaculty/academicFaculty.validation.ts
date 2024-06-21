import { z } from "zod";



const academicFacultyValidationSchema=z.object({
    name:z.string({
        invalid_type_error:'In valid Faculty name'
    })
})
const updateAcademicFacultyValidationSchema=z.object({
    name:z.string({
        invalid_type_error:'In valid Faculty name'
    })
})

export const academicFacultyValidation={
    academicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
}