import { z } from 'zod';

export const SignupSchema = z.object({
   firstName: z.string(),
   lastName: z.string(),
   userName: z.string(),
   phoneNumber: z.string(),
   email: z.string().email(),
   password: z.string(),
});

export default SignupSchema;
