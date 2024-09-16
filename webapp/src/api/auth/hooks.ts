import { API_AUTH_URL, login, signUp } from './actions.ts';
import useSWRMutation from 'swr/mutation';

export function useLogin() {
   const { data, trigger, error } = useSWRMutation(API_AUTH_URL.LOGIN, login);
   return { data, trigger, error };
}

export function useSignUp() {
   const { data, trigger, error } = useSWRMutation(API_AUTH_URL.SIGNUP, signUp);
   return { data, trigger, error };
}
