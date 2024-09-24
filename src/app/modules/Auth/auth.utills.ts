import jwt, { JwtPayload } from "jsonwebtoken";

 export const createToken = (
  jsonPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jsonPayload, secret, { expiresIn });
};


export const VerifyToken=(token:string,secret:string)=>{
  return jwt.verify(token,
    secret as string) as JwtPayload;
}