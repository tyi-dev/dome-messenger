import { API_MESSAGE_STATUS_URL, updateAllUnreadStatuses } from './actions.ts';
import useSWRMutation from 'swr/mutation';

/*export function useUpdateMessageStatus(conversationId: number) {
   return useSWRMutation(`${API_MESSAGE_STATUS_URL.UPDATE}/${conversationId}`, (key) => updateMessageStatus(key));
}*/

export function useUpdateAllUnreadStatuses(conversationId: number) {
   return useSWRMutation(`${API_MESSAGE_STATUS_URL.UPDATE_ALL}/${conversationId}`, (key) =>
      updateAllUnreadStatuses(key),
   );
}
