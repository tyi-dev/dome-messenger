import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { API_CONVERSATION_URL, createConversation, getMyConversations, updateConversation } from './actions.ts';

export function useMyConversations() {
   return useSWR(API_CONVERSATION_URL.MY_CONVERSATIONS, getMyConversations);
}

export function useCreateConversation() {
   return useSWRMutation(API_CONVERSATION_URL.CREATE, createConversation);
}

export function useUpdateConversation(conversationId: number) {
   return useSWRMutation(`${API_CONVERSATION_URL.UPDATE}/${conversationId}`, updateConversation);
}
