import { z } from 'zod';
import { ConversationType } from '../../types/conversation';

const UserSelectSchema = z.object({
   id: z.number(),
   userName: z.string(),
   firstName: z.string().optional(),
   lastName: z.string().optional(),
   lastSeen: z.string().optional(),
   email: z.string().email().optional(),
   phoneNumber: z.string().optional(),
});

export const ConversationOperationsSchema = (conversationType: ConversationType) =>
   z.object({
      title:
         conversationType === ConversationType.P2P
            ? z.string().optional()
            : z.string().min(1, 'Provide name for conversation'),
      participants: z.array(UserSelectSchema),
   });

export type ConversationSchemaResultType = z.infer<ReturnType<typeof ConversationOperationsSchema>>;
