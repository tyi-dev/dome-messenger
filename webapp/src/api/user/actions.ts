import API from '../api.ts';
import { User } from '@shared/types/user.ts';

export const BASE_URL_USER = 'users';

export const API_USER_URL = {
   ME: `${BASE_URL_USER}/me`,
};

export async function getCurrentUser(): Promise<User> {
   const res = await API.get<User>(API_USER_URL.ME);
   return res?.data || null;
}
