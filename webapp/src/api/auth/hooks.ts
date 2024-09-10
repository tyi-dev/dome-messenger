import { LoginPayload, SignUpPayload } from '@shared/types/auth';
import { TokenResponce } from '@shared/types/auth';
import useSWR from 'swr';
import { API_AUTH_URL, login, signUp } from './actions.ts';

export function useLogin(loginPayload: LoginPayload) {
   const { data, isLoading, error } = useSWR<TokenResponce>(API_AUTH_URL.LOGIN, () => login(loginPayload));
   return { data, isLoading, error };
}

export function useSignUp(signUpPayload: SignUpPayload) {
   const { data, isLoading, error } = useSWR<TokenResponce>(API_AUTH_URL.SIGNUP, () => signUp(signUpPayload));
   return { data, isLoading, error };
}
