import useSWRMutation from 'swr/mutation';
import { API_MESSAGE_URL, createMessage, deleteMessage, updateMessage } from './actions.ts';
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription';
import API from '../api.ts';
import { Message } from '@shared/types/message.ts';
import { WSNamespace } from '@shared/types/websockets.ts';

export function useConversationMessages(conversationId: number) {
   return useSWRSubscription(
      `${API_MESSAGE_URL.GET_MESSAGES}/${conversationId}`,
      (key, { next }: SWRSubscriptionOptions<Message[], Error>) => {
         const handleUpdateMessages = (data: Message[]) => {
            next(null, data);
         };

         API.socket.on(WSNamespace.CONVERSATION_MESSAGES, handleUpdateMessages);

         API.socket.emit(WSNamespace.CONVERSATION_MESSAGES, { conversationId: conversationId });

         return () => {
            API.socket.off(WSNamespace.CONVERSATION_MESSAGES, handleUpdateMessages);
         };
      },
   );
}

export function useCreateMessage() {
   return useSWRMutation(API_MESSAGE_URL.CREATE, createMessage);
}

export function useUpdateMessage(messageId?: number, conversationId?: number) {
   return useSWRMutation(
      messageId && conversationId ? `${API_MESSAGE_URL.UPDATE}/${messageId}` : null,
      (key, options) => updateMessage(key, options, conversationId),
   );
}

export function useDeleteMessage(messageId: number, conversationId: number) {
   return useSWRMutation(`${API_MESSAGE_URL.DELETE}/${messageId}`, () => deleteMessage(messageId, conversationId));
}
