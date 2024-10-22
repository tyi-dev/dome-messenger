import API from '../api.ts';
import { Message, MessageCreatePayload, MessageUpdatePayload } from '@shared/types/message.ts';
import { WSNamespace } from '@shared/types/websockets.ts';

export const BASE_URL_MESSAGE = 'message';

export const API_MESSAGE_URL = {
   CREATE: `${BASE_URL_MESSAGE}/create`,
   UPDATE: `${BASE_URL_MESSAGE}/update`,
   DELETE: `${BASE_URL_MESSAGE}/delete`,
   GET_MESSAGES: `${BASE_URL_MESSAGE}/get-messages`,
   GET_LAST_CONVERSATION_MESSAGE: `${BASE_URL_MESSAGE}/get-last-message`,
};

export async function getLastConversationMessage(key: string) {
   const res = await API.get<Message[]>(key);
   return res.data[0] || null;
}

export async function updateMessage(_key: string, options: { arg: MessageUpdatePayload }) {
   API.socket.emit(WSNamespace.UPDATE_MESSAGE, {
      data: options.arg,
      conversationId: options.arg.conversationId,
   });
}

export async function createMessage(_key: string, options: { arg: MessageCreatePayload }) {
   API.socket.emit(WSNamespace.CREATE_MESSAGE, {
      data: options.arg,
   });
}

export async function deleteMessage(messageId: number, conversationId: number) {
   API.socket.emit(WSNamespace.DELETE_MESSAGE, {
      data: {
         messageId: messageId,
      },
      conversationId: conversationId,
   });
}
