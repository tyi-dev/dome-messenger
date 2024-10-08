import API from '../api.ts';
import { Message } from '@shared/types/message.ts';
import { MessageCreatePayload, MessageUpdatePayload } from '../../../../shared/types/message.ts';

export const BASE_URL_MESSAGE = 'message';

export const API_MESSAGE_URL = {
   CREATE: `${BASE_URL_MESSAGE}/create`,
   UPDATE: `${BASE_URL_MESSAGE}/update`,
   DELETE: `${BASE_URL_MESSAGE}/delete`,
   GET_MESSAGES: `${BASE_URL_MESSAGE}/get-messages`,
};

/*export async function getConversationMessages(key: string): Promise<Message[]> {
   const res = await API.get<Message[]>(key);
   return res?.data || null;
}*/

export async function updateMessage(
   key: string,
   options: { arg: MessageUpdatePayload },
   conversationId: number | undefined,
) {
   console.log(key);
   console.log(conversationId);
   console.log(options);
   API.socket.emit('conversation', {
      messageToUpdate: {
         content: options.arg.content,
         id: options.arg.id,
      },
      conversationId: conversationId,
   });
}

export async function createMessage(key: string, options: { arg: MessageCreatePayload }) {
   API.socket.emit('conversation', {
      messageToCreate: {
         content: options.arg.content,
      },
      conversationId: options.arg.conversationId,
   });
}

export async function deleteMessage(messageId: number, conversationId: number) {
   API.socket.emit('conversation', {
      messageToDelete: {
         id: messageId,
      },
      conversationId: conversationId,
   });
}
