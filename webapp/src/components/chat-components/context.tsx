import { createContext, useContext } from 'react';
import { Conversation } from '@shared/types/conversation.ts';
import { Nullable } from '@shared/types/nullable.ts';
import { User } from '@shared/types/user.ts';
import { Message } from '@shared/types/message.ts';

export type InputPayload = {
   text: Nullable<string>;
};

export type TChatContext = {
   currentConversation: Nullable<Conversation>;
   setCurrentConversation: (conversation: Nullable<Conversation>) => void;
   currentUser: User;
   userToCreateConversationWith: Nullable<Pick<User, 'id' | 'userName'>>;
   messageToUpdate: Nullable<Message>;
   setUserToCreateConversation: (user: Nullable<Pick<User, 'id' | 'userName'>>) => void;
   setMessageToUpdate: (message: Nullable<Message>) => void;
   inputPayload: InputPayload;
   setInputPayload: (inputPayload: Partial<InputPayload>) => void;
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
   userToCreateConversationWith: null,
   messageToUpdate: null,
   setUserToCreateConversation: () => {},
   setMessageToUpdate: () => {},
   inputPayload: {
      text: null,
   },
   setInputPayload: () => {},
});

export const useChatContext = (): TChatContext => useContext(ChatContext);
