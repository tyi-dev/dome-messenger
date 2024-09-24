import { API_MESSAGE_STATUS_URL, updateMessageStatus } from './actions.ts';
import useSWRMutation from 'swr/mutation';

export function useConversationParticipants(conversationId: number) {
   return useSWRMutation(`${API_MESSAGE_STATUS_URL.UPDATE}/${conversationId}`, (key) => updateMessageStatus(key));
}
