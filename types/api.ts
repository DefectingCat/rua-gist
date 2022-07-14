import { UserInfo } from 'app/features/user/userSlice';
import { ValidationError } from 'fastest-validator';

export type BaseStatus = 'success' | 'error';
export type BaseInfo = {
  status: BaseStatus;
  message: string;
};

export type SignInReturn = {
  data: UserInfo | {} | ValidationError[];
} & BaseInfo;
export type CheckUserReturn = {
  data: UserInfo;
} & BaseInfo;
