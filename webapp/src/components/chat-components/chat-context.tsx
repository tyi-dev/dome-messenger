import { createContext, LegacyRef, Ref, useContext } from 'react';
import { Conversation } from '@shared/types/conversation.ts';
import { Nullable } from '@shared/types/nullable.ts';
import { SearchUserRes, User } from '@shared/types/user.ts';
import { Message } from '@shared/types/message.ts';

export type InputPayload = {
   text: Nullable<string>;
};

export type TChatContext = {
   currentConversation: Nullable<Conversation>;
   setCurrentConversation: (conversation: Nullable<Conversation>) => void;
   currentUser: User;
   userToCreateConversationWith: Nullable<SearchUserRes>;
   messageToUpdate: Nullable<Message>;
   setUserToCreateConversation: (user: Nullable<SearchUserRes>) => void;
   setMessageToUpdate: (message: Nullable<Message>) => void;
   inputPayload: InputPayload;
   setInputPayload: (inputPayload: Partial<InputPayload>) => void;
   inputRef: Nullable<LegacyRef<HTMLInputElement>>;
   conversationBottomRef: Ref<HTMLDivElement>;
   scrollToBottom: () => void;
   isSidebarOpen: boolean;
   setSidebarOpen: (isOpen: boolean) => void;
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
      lastSeen: '',
   },
   userToCreateConversationWith: null,
   messageToUpdate: null,
   setUserToCreateConversation: () => {},
   setMessageToUpdate: () => {},
   inputPayload: {
      text: null,
   },
   setInputPayload: () => {},
   inputRef: null,
   conversationBottomRef: null,
   scrollToBottom: () => {},
   isSidebarOpen: false,
   setSidebarOpen: () => {},
});

export const useChatContext = (): TChatContext => useContext(ChatContext);
