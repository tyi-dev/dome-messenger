import ConversationsList from '@webapp/src/components/chat-components/ConversationsList';
import CurrentConversation from './chat-components/CurrentConversation';
import MessageOperationsInput from './chat-components/MessageOperationsInput';
import { User } from '@shared/types/user.ts';
import { useState } from 'react';
import { Conversation } from '@shared/types/conversation';
import { ChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { Nullable } from '@shared/types/nullable.ts';
import { Message } from '@shared/types/message.ts';

export default function ChatLayout(props: { user: User }) {
   const { user } = props;
   const [currentConversation, setCurrentConversation] = useState<Nullable<Conversation>>(null);
   const [userToCreateConversationWith, setUserToCreateConversationWith] =
      useState<Nullable<Pick<User, 'id' | 'userName'>>>(null);
   const [messageToUpdate, setMessageToUpdate] = useState<Nullable<Message>>(null);

   return (
      <ChatContext.Provider
         value={{
            currentConversation: currentConversation,
            setCurrentConversation: setCurrentConversation,
            currentUser: user,
            messageToUpdate: messageToUpdate,
            setMessageToUpdate: setMessageToUpdate,
            userToCreateConversationWith: userToCreateConversationWith,
            setUserToCreateConversation: setUserToCreateConversationWith,
         }}
      >
         <div className="w-full flex flex-row h-full">
            <ConversationsList />
            <div className="w-full flex flex-col h-full">
               <CurrentConversation />
               <MessageOperationsInput />
            </div>
         </div>
      </ChatContext.Provider>
   );
}
