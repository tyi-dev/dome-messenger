import API from '../api.ts';
import { User } from '@shared/types/user.ts';

export const BASE_URL_USER = 'users';

export const API_USER_URL = {
   ME: `${BASE_URL_USER}/me`,
   UPDATE: `${BASE_URL_USER}/update-profile`,
};

export async function getCurrentUser(): Promise<User> {
   const res = await API.get<User>(API_USER_URL.ME);
   return res?.data || null;
}

export async function updateProfile(key: string, options: { arg: Partial<User> }): Promise<User> {
   const res = await API.put<Partial<User>, User>(key, options.arg);
   return res?.data || null;
}
