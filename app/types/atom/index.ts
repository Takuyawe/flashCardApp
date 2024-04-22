import { User } from '@prisma/client';

export type UserAtom = Pick<User, 'email' | 'name'>;
