import API from '../api.ts';
import { TokenResponce } from '@shared/types/auth';
import { LoginPayload, SignUpPayload } from '@shared/types/auth';
import Cookies from 'js-cookie';

export const BASE_URL_AUTH = 'auth';

export const API_AUTH_URL = {
   LOGIN: `${BASE_URL_AUTH}/login`,
   SIGNUP: `${BASE_URL_AUTH}/register`,
};

export async function login(data: LoginPayload): Promise<TokenResponce> {
   const res = await API.post<LoginPayload, TokenResponce>(API_AUTH_URL.LOGIN, data);
   setAuthToken(res?.data.domeAccessToken);
   return res?.data;
}

export async function signUp(data: SignUpPayload): Promise<TokenResponce> {
   const res = await API.post<SignUpPayload, TokenResponce>(API_AUTH_URL.SIGNUP, data);
   setAuthToken(res?.data.domeAccessToken);
   return res?.data;
}

function setAuthToken(token: string) {
   Cookies.set('domeAccessToken', token, {
      expires: 7,
      path: '/',
      secure: false, // Ensures cookie is sent only over HTTPS(true)
      sameSite: 'Strict',
   });
}