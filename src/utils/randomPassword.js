import crypto from "crypto";
import bcrypt from "bcrypt";

const generateRandomPassword = () => {
  const random = crypto.randomBytes(8).toString("hex");
  return bcrypt.hash(random, 10);
};

export { generateRandomPassword };
