import useSWR from 'swr';
import { API_USER_URL, getCurrentUser } from './actions.ts';
import { User } from '@shared/types/user.ts';

export function useCurrentUser() {
   const { data, isLoading, error } = useSWR<User>(API_USER_URL.ME, getCurrentUser);
   return { data, isLoading, error };
}
