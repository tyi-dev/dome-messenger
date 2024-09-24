export type Conversation = {
   id: number;
   title: string;
   conversationType: ConversationType;
   createdAt: string;
   updatedAt: string;
};

export enum ConversationType {
   P2P = 'P2P',
   GROUP = 'GROUP',
   CHANNEL = 'CHANNEL',
}
