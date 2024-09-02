import { z } from "zod";

export const LoginUserValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is Required " }),
    password: z.string({ required_error: "passWord is Required " }),
  }),
});
export const ChangeLoginPasswordUserValidation = z.object({
  body: z.object({
    OldPassword: z.string({ required_error: " Old passWord is Required " }),
    newPassword: z.string({ required_error: "new passWord is Required " }),
  }),
});
export const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "id  is required" }),
  }),
});

export const resetPasswordValidationSchema=z.object({
  body:z.object({
    id:z.string({required_error:'Id is required'}),
    newPassword:z.string({required_error:'new password is required '})
  })
})
