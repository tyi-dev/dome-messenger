import API from '../api.ts';
import { ConversationParticipant } from '@shared/types/conversation-participant.ts';

export const BASE_URL_CONVERSATION_PARTICIPANT = 'conversation-participant';

export const API_CONVERSATION_PARTICIPANT_URL = {
   GET_PARTICIPANTS: `${BASE_URL_CONVERSATION_PARTICIPANT}/get-participants`,
};

export async function getConversationParticipants(key: string): Promise<ConversationParticipant[]> {
   const res = await API.get<ConversationParticipant[]>(key);
   return res?.data || null;
}
