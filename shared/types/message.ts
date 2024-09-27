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
