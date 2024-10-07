import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

type Response<T> = { data: T };

const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
   auth: {
      token: Cookies.get('domeAccessToken'),
   },
});

async function http<T>(path: string, config: RequestInit): Promise<Response<T>> {
   const authorization = Cookies.get('domeAccessToken');

   const init = {
      ...config,
      headers: {
         Authorization: `Bearer ${authorization}`,
         ...config.headers,
      },
   };

   const request = new Request(`${import.meta.env.VITE_API_URL}${path}`, init);
   const response = await fetch(request);

   // may error if there is no body, return empty array
   return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<Response<T>> {
   const init = { method: 'get', ...config };
   return await http<T>(path, init);
}

export async function post<T, U>(path: string, body: T, config?: RequestInit): Promise<Response<U>> {
   let init = {};

   if (body instanceof FormData) {
      init = {
         method: 'post',
         body: body,
         ...config,
      };
   } else {
      init = {
         method: 'post',
         body: JSON.stringify(body),
         headers: {
            'Content-Type': 'application/json',
         },
         ...config,
      };
   }

   return await http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config?: RequestInit): Promise<Response<U>> {
   const init = {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
         'Content-Type': 'application/json',
      },
      ...config,
   };
   return await http<U>(path, init);
}

export async function _delete<T>(path: string, config?: RequestInit): Promise<Response<T>> {
   const init = { method: 'delete', ...config };
   return await http<T>(path, init);
}

const API = {
   socket,
   get,
   post,
   put,
   delete: _delete,
};

export default API;
