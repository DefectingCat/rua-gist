import { ValidationError } from 'fastest-validator';

export type BaseStatus = 'sucess' | 'error';

export type SignInReturn = {
  status: BaseStatus;
  message: string;
  data: {} | ValidationError[];
};
