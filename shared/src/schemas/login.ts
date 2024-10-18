import { z } from 'zod';

export const LoginSchema = z.object({
   email: z.string().email('Invalid email').min(1, 'Email can`t be empty'),
   password: z.string().min(1),
});

export default LoginSchema;
