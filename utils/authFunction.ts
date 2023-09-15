import jwt from "jsonwebtoken";
import { models } from "../database/database";

//Protect
export const protect = async (req) => {
  // 1- check  if token exist
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
   return null
  }

  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // check if user exist
  const user = await models.User.findByPk(decoded.userId);

  return user;
};