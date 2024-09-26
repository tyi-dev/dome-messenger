import { createContext, useContext } from 'react';
import { Conversation } from '@shared/types/conversation.ts';
import { Nullable } from '@shared/types/nullable.ts';
import { User } from '@shared/types/user.ts';

export type TChatContext = {
   currentConversation: Nullable<Conversation>;
   setCurrentConversation: (conversation: Nullable<Conversation>) => void;
   currentUser: User;
};

export const ChatContext = createContext<TChatContext>({
   currentConversation: null,
   setCurrentConversation: () => {},
   currentUser: {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
   },
});

export const useChatContext = (): TChatContext => useContext(ChatContext);
