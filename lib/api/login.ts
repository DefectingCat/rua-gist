import { BaseInfo, CheckUserReturn, SignInReturn } from 'types/api';
import $ax from './axios-tools';

export const login = async (email: string, password: string) =>
  (await $ax.post<SignInReturn>('/user/signin', { email, password })).data;

export const logout = async () =>
  (await $ax.post<BaseInfo>('/user/logout')).data;

export const checkUser = async () =>
  (await $ax.get<CheckUserReturn>('/user/check-login')).data;
