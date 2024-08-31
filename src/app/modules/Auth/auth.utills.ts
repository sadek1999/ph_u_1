import jwt from "jsonwebtoken";

 export const createToken = (
  jsonPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  jwt.sign(jsonPayload, secret, { expiresIn });
};
