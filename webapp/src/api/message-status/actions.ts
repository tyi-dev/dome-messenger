import { MessageStatus } from '@shared/types/message.ts';
import API from '../api.ts';

export const BASE_URL_MESSAGE_STATUS = 'message-status';

export const API_MESSAGE_STATUS_URL = {
   UPDATE: `${BASE_URL_MESSAGE_STATUS}/update`,
   UPDATE_ALL: `${BASE_URL_MESSAGE_STATUS}/update-all`,
};

/*export async function updateMessageStatus(key: string): Promise<MessageStatus> {
   const res = await API.get<MessageStatus>(key);
   return res?.data || null;
}*/

export async function updateAllUnreadStatuses(key: string): Promise<MessageStatus[]> {
   const res = await API.put<Pick<MessageStatus, 'readAt'>, MessageStatus[]>(key, { readAt: new Date().toISOString() });
   return res?.data || null;
}
