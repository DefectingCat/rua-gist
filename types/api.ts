import { ValidationError } from 'fastest-validator';

export type BaseStatus = 'sucess' | 'error';

export type UserInfo = {
  name: string | null;
  email: string;
  bio: string | null;
  avatar: string | null;
};
export type SignInReturn = {
  status: BaseStatus;
  message: string;
  data: UserInfo | {} | ValidationError[];
};
