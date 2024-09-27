import API from '../api.ts';
import { Conversation } from '@shared/types/conversation.ts';
import { User } from '@shared/types/user.ts';

export const BASE_URL_CONVERSATION = 'conversation';

export const API_CONVERSATION_URL = {
   MY_CONVERSATIONS: `${BASE_URL_CONVERSATION}/my-conversations`,
   UPDATE: `${BASE_URL_CONVERSATION}/update`,
   CREATE: `${BASE_URL_CONVERSATION}/create`,
};

export async function getMyConversations(): Promise<Conversation[]> {
   const res = await API.get<Conversation[]>(API_CONVERSATION_URL.MY_CONVERSATIONS);
   return res?.data || null;
}

export async function updateConversation(key: string, options: { arg: Partial<Conversation> }): Promise<Conversation> {
   const res = await API.put<Partial<Conversation>, Conversation>(key, options.arg);
   return res?.data || null;
}

type createConversationUserT = Required<Pick<User, 'id'>> & Partial<Omit<User, 'id'>>;
type createConversationArgs = {
   participants: createConversationUserT[];
   title: string;
};
export async function createConversation(key: string, options: { arg: createConversationArgs }): Promise<Conversation> {
   const res = await API.post<createConversationArgs, Conversation>(key, options.arg);
   return res?.data || null;
}
