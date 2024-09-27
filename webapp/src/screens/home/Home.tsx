import { useCurrentUser } from '@webapp/src/api/user/hooks.ts';
import HomeSidebar from '@webapp/src/components/home-sidebar/HomeSidebar';
import Spinner from '@webapp/src/components/Spinner';
import ChatLayout from '@webapp/src/components/ChatLayout';
import { User } from '@shared/types/user.ts';
import { useState } from 'react';
import { Conversation } from '@shared/types/conversation';
import { ChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { Nullable } from '@shared/types/nullable.ts';
import { Message } from '@shared/types/message.ts';
export default function HomePage() {
   const { data: currentUser } = useCurrentUser();
   if (!currentUser) return <Spinner />;

   const [currentConversation, setCurrentConversation] = useState<Nullable<Conversation>>(null);
   const [userToCreateConversationWith, setUserToCreateConversationWith] =
      useState<Nullable<Pick<User, 'id' | 'userName'>>>(null);
   const [messageToUpdate, setMessageToUpdate] = useState<Nullable<Message>>(null);
   const setUserToCreateConversationFunc = (user: Nullable<Pick<User, 'id' | 'userName'>>) => {
      setUserToCreateConversationWith(user);
   };
   const setMessageToUpdateFunc = (message: Nullable<Message>) => {
      setMessageToUpdate(message);
   };
   return (
      <ChatContext.Provider
         value={{
            currentConversation: currentConversation,
            setCurrentConversation: setCurrentConversation,
            currentUser: currentUser,
            messageToUpdate: messageToUpdate,
            setMessageToUpdate: setMessageToUpdateFunc,
            userToCreateConversationWith: userToCreateConversationWith,
            setUserToCreateConversation: setUserToCreateConversationFunc,
         }}
      >
         <div className="flex flex-row w-full h-full">
            <HomeSidebar />
            <div className="w-full h-full bg-general-light">
               <ChatLayout />
            </div>
         </div>
      </ChatContext.Provider>
   );
}
