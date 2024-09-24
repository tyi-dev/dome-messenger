import { z } from 'zod';

export const UserUpdateSchema = z.object({
   firstName: z.string(),
   lastName: z.string(),
   phoneNumber: z.string(),
   email: z.string().email(),
});

export default UserUpdateSchema;
