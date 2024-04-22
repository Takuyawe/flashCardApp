import bcrypt from "bcryptjs";

type ComparePasswords = (
  candidatePassword: string,
  hashedPassword: string
) => Promise<boolean>;

export const comparePasswords: ComparePasswords = async (
  candidatePassword,
  hashedPassword
) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};
