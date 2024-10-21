import useSWRMutation from 'swr/mutation';
import { API_MESSAGE_URL, createMessage, deleteMessage, getLastConversationMessage, updateMessage } from './actions.ts';
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription';
import API from '../api.ts';
import { Message } from '@shared/types/message.ts';
import { WSNamespace } from '@shared/types/websockets.ts';
import { API_USER_URL, updateLastSeen } from '@webapp/src/api/user/actions.ts';
import useSWR from 'swr';

export function useConversationMessages(conversationId?: number) {
   return useSWRSubscription(
      conversationId ? `${API_MESSAGE_URL.GET_MESSAGES}/${conversationId}` : null,
      (_key, { next }: SWRSubscriptionOptions<Message[], Error>) => {
         const handleUpdateMessages = (data: Message[]) => {
            next(null, data);
         };

         API.socket.on(WSNamespace.CONVERSATION_MESSAGES, handleUpdateMessages);

         API.socket.emit(WSNamespace.CONVERSATION_MESSAGES, { conversationId: conversationId });

         return () => {
            updateLastSeen(API_USER_URL.UPDATE_LAST_SEEN, { lastSeen: new Date().toISOString() }).then();
            API.socket.off(WSNamespace.CONVERSATION_MESSAGES, handleUpdateMessages);
         };
      },
   );
}

export function useCreateMessage() {
   return useSWRMutation(API_MESSAGE_URL.CREATE, createMessage);
}

export function useUpdateMessage(messageId?: number) {
   return useSWRMutation(messageId ? `${API_MESSAGE_URL.UPDATE}/${messageId}` : null, updateMessage);
}

export function useLastConversationMessage(conversationId: number) {
   return useSWR(conversationId ? `${API_MESSAGE_URL.GET_LAST_CONVERSATION_MESSAGE}/${conversationId}` : null, (key) =>
      getLastConversationMessage(key),
   );
}

export function useDeleteMessage(messageId: number, conversationId: number) {
   return useSWRMutation(`${API_MESSAGE_URL.DELETE}/${messageId}`, () => deleteMessage(messageId, conversationId));
}
