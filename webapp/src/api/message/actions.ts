import API from '../api.ts';
import { Message } from '@shared/types/message.ts';

export const BASE_URL_MESSAGE = 'message';

export const API_MESSAGE_URL = {
   CREATE: `${BASE_URL_MESSAGE}/create`,
   UPDATE: `${BASE_URL_MESSAGE}/update`,
   DELETE: `${BASE_URL_MESSAGE}/delete`,
   GET_MESSAGES: `${BASE_URL_MESSAGE}/get-messages`,
};

/*
export async function getConversationMessages(key: string): Promise<Message[]> {
   const res = await API.get<Message[]>(key);
   return res?.data || null;
}
*/

export async function getConversationMessages(key: string) {
   API.socket.on('conversation', ({ data }) => {
      console.log(data);
   });
}

export async function updateMessage(key: string, options: { arg: { content: string } }): Promise<Message> {
   const res = await API.put<{ content: string }, Message>(key, options.arg);
   return res?.data || null;
}

export async function createMessage(key: string, options: { arg: Partial<Message> }) {
   API.socket.emit('conversation', options.arg.content);
}

/*export async function createMessage(key: string, options: { arg: Partial<Message> }): Promise<Message> {
   const res = await API.post<Partial<Message>, Message>(key, options.arg);
   return res?.data || null;
}*/

export async function deleteMessage(key: string): Promise<Message> {
   const res = await API.delete<Message>(key);
   return res?.data || null;
}
