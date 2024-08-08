import { z } from "zod";


export const LoginUserValidation=z.object({
    body:z.object({
        id:z.string({required_error:"Id is Required "}),
        password:z.string({required_error:"passWord is Required "})
    })
})
export const ChangeLoginPasswordUserValidation=z.object({
    body:z.object({
       OldPassword:z.string({required_error:" Old passWord is Required "}),
        newPassword:z.string({required_error:"new passWord is Required "})
    })
})