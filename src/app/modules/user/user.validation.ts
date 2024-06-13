import z from 'zod'

const userValidationSchema=z.object({
    
    password:z.
    string({
        invalid_type_error:'password mast be string'
    }).max(20,'password max 20 characters').
    min(6,'password mast be 6 characters').
    optional(),
    
    

})

export const userValidation={
    userValidationSchema
}