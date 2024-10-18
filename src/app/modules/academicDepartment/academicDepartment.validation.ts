import { z } from "zod";




const createAcademicDepartmentValidationSchema=z.object({
    body:z.object({
        name:z.string({invalid_type_error:"Department name mast be string"}),
        academicFaculty:z.string()
    })
})

const updateAcademicDepartmentValidationSchema=z.object({
    body:z.object({
        name:z.string({invalid_type_error:'Department mast be string'}).optional(),
        academicFaculty:z.string().optional()
    })
})

export const academicDepartmentValidation={
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}