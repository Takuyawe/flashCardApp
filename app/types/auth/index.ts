import { User } from '@prisma/client';

export type AuthResponse = {
  success: boolean;
  message?: string;
  data?: User;
};
