import { User } from '@prisma/client';

export type UserAtom = Pick<User, 'id' | 'email' | 'name'>;
