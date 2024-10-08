export type Message = {
   id: number;
   content: string;
   senderId: number;
   conversationId: number;
   createdAt: string;
   status: MessageStatus[];
};

export type MessageStatus = {
   id: number;
   messageId: number;
   userId: number;
   readAt: null | string;
};

export type MessageCreatePayload = Pick<Message, 'content' | 'conversationId'>;

export type MessageUpdatePayload = Pick<Message, 'content' | 'id'>;

export type MessageDeletePayload = Pick<Message, 'id'>;

export type MessageWebsocketPayload = {
   messageToCreate?: MessageCreatePayload;
   messageToUpdate?: MessageUpdatePayload;
   messageToDelete?: MessageDeletePayload;
   conversationId: number;
};
