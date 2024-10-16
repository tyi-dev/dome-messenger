import { z } from 'zod';

export const SignupSchema = z.object({
   firstName: z.string().min(1, 'First name can`t be empty'),
   lastName: z.string().min(1, 'Last name can`t be empty'),
   userName: z.string().min(1, 'User name can`t be empty'),
   phoneNumber: z.string().min(1, 'Phone number can`t be empty'),
   email: z.string().email().min(1, 'Email can`t be empty'),
   password: z.string().min(1, 'Password can`t be empty'),
});

export default SignupSchema;
