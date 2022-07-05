import { ValidationError } from 'fastest-validator';

export type BaseStatus = 'sucess' | 'error';
export type BaseInfo = {
  status: BaseStatus;
  message: string;
};

export type UserInfo = {
  name: string | null;
  email: string;
  bio: string | null;
  avatar: string | null;
};
export type SignInReturn = {
  data: UserInfo | {} | ValidationError[];
} & BaseInfo;
