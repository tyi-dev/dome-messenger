import API from '../api.ts';
import { Message } from '@shared/types/message.ts';
import { SWRSubscriptionOptions } from 'swr/subscription';
import { data } from 'autoprefixer';

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

export async function getConversationMessages(key: string, { next }: SWRSubscriptionOptions<Message[], Error>) {
   const handleUpdateMessages = ({ data }: { data: Message[] }) => {
      console.log(data);
      next(undefined, data);
   };

   /*   API.socket.on('conversation', (socket) => {
      console.log('asd' + socket);
      socket.join('test123');
   });*/

   API.socket.on('connection', (socket) => {
      console.log(socket);
      socket.join('some room');
      handleUpdateMessages(socket.);
   });

   return () => {
      API.socket.off('conversation', handleUpdateMessages);
   };
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
