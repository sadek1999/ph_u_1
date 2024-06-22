import { z } from "zod";




const createAcademicDepartmentValidationSchema=z.object({
    body:z.object({
        name:z.string({invalid_type_error:"Department name mast be string"}),
        academicFaculty:z.string()
    })
})

const updateAcademicFacultyValidationSchema=z.object({
    body:z.object({
        name:z.string({invalid_type_error:'Department mast be string'}).optional(),
        academicFaculty:z.string()
    })
})

export const academicDepartmentValidation={
    createAcademicDepartmentValidationSchema,
    updateAcademicFacultyValidationSchema
}