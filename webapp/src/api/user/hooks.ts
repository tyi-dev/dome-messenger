import useSWR from 'swr';
import { API_USER_URL, getCurrentUser, getUserById, getUsers, updateProfile } from './actions.ts';
import { User } from '@shared/types/user.ts';
import Cookies from 'js-cookie';
import useSWRMutation from 'swr/mutation';
import { ConversationType } from '@shared/types/conversation.ts';

export function useCurrentUser() {
   const authCookie = Cookies.get('domeAccessToken');
   const { data, isLoading, error } = useSWR<User>(authCookie ? API_USER_URL.ME : null, getCurrentUser);
   if (!isLoading && !data && authCookie) {
      Cookies.remove('domeAccessToken');
   }
   return { data, isLoading, error };
}

export function useUserById(id: number) {
   return useSWR(`${API_USER_URL.BY_ID}/${id}`, getUserById);
}

export function useUpdateUser() {
   return useSWRMutation(API_USER_URL.UPDATE, updateProfile);
}

export function useSearchUsers(currentConversationType?: ConversationType) {
   return useSWR(currentConversationType ? `${API_USER_URL.ALL}/${currentConversationType}` : null, getUsers);
}
