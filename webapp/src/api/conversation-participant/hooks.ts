import useSWR from 'swr';
import {
   API_CONVERSATION_PARTICIPANT_URL,
   getConversationParticipant,
   getConversationParticipants,
} from './actions.ts';

export function useConversationParticipants(conversationId?: number) {
   return useSWR(
      conversationId ? `${API_CONVERSATION_PARTICIPANT_URL.GET_PARTICIPANTS}/${conversationId}` : null,
      (key) => getConversationParticipants(key),
   );
}

export function useConversationParticipant(conversationId?: number) {
   return useSWR(
      conversationId ? `${API_CONVERSATION_PARTICIPANT_URL.GET_PARTICIPANT}/${conversationId}` : null,
      getConversationParticipant,
   );
}
