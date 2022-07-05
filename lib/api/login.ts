import { BaseInfo, SignInReturn } from 'types/api';
import $ax from './axios-tools';

export const login = async (email: string, password: string) =>
  (await $ax.post<SignInReturn>('/signin', { email, password })).data;

export const logout = async () => (await $ax.post<BaseInfo>('/logout')).data;
