import jwt from "jsonwebtoken";

 export const createToken = (
  jsonPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jsonPayload, secret, { expiresIn });
};
