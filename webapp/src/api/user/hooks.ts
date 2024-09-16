import useSWR from 'swr';
import { API_USER_URL, getCurrentUser } from './actions.ts';
import { User } from '@shared/types/user.ts';
import Cookies from 'js-cookie';

export function useCurrentUser() {
   const authCookie = Cookies.get('domeAccessToken');
   const { data, isLoading, error } = useSWR<User>(authCookie ? API_USER_URL.ME : null, getCurrentUser);
   if (!isLoading && !data && authCookie) {
      Cookies.set('domeAccessToken', '');
   }
   return { data, isLoading, error };
}
