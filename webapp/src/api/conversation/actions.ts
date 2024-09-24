import API from '../api.ts';
import { User } from '@shared/types/user.ts';

export const BASE_URL_CONVERSATION = 'conversation';

export const API_CONVERSATION_URL = {
   MY_CONVERSATIONS: `${BASE_URL_CONVERSATION}/my-conversations`,
   UPDATE: `${BASE_URL_CONVERSATION}/update`,
   CREATE: `${BASE_URL_CONVERSATION}/create`,
};

export async function getMyConversations(): Promise<User> {
   const res = await API.get<User>(API_CONVERSATION_URL.MY_CONVERSATIONS);
   return res?.data || null;
}

export async function updateProfile(key: string, options: { arg: Partial<User> }): Promise<User> {
   const res = await API.put<Partial<User>, User>(key, options.arg);
   return res?.data || null;
}
