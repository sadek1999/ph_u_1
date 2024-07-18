import { z } from "zod";


export const LoginUserValidation=z.object({
    body:z.object({
        id:z.string({required_error:"Id is Required "}),
        password:z.string({required_error:"passWord is Required "})
    })
})