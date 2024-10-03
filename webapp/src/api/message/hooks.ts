import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { API_MESSAGE_URL, createMessage, deleteMessage, getConversationMessages, updateMessage } from './actions.ts';

export function useConversationMessages(conversationId: number) {
   return useSWR(`${API_MESSAGE_URL.GET_MESSAGES}/${conversationId}`, (key) => getConversationMessages(key));
   // return useSWR(`${API_MESSAGE_URL.GET_MESSAGES}/${conversationId}`, (key) => getConversationMessages(key));
}

export function useCreateMessage() {
   return useSWRMutation(API_MESSAGE_URL.CREATE, createMessage);
}

export function useUpdateMessage(conversationId?: number) {
   return useSWRMutation(conversationId ? `${API_MESSAGE_URL.UPDATE}/${conversationId}` : null, updateMessage);
}

export function useDeleteMessage(conversationId: number) {
   return useSWRMutation(`${API_MESSAGE_URL.DELETE}/${conversationId}`, deleteMessage);
}
