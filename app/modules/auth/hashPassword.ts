import bcrypt from "bcryptjs";

type HashPassword = (password: string) => Promise<string>;

export const hashPassword: HashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
