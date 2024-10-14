import { useCurrentUser } from '@webapp/src/api/user/hooks.ts';
import HomeSidebar from '@webapp/src/components/home-sidebar/HomeSidebar';
import Spinner from '@webapp/src/components/Spinner';
import ChatLayout from '@webapp/src/components/ChatLayout';
import { User } from '@shared/types/user.ts';
import { useRef, useState } from 'react';
import { Conversation } from '@shared/types/conversation';
import { ChatContext, InputPayload } from '@webapp/src/components/chat-components/context.tsx';
import { Nullable } from '@shared/types/nullable.ts';
import { Message } from '@shared/types/message.ts';
export default function HomePage() {
   const { data: currentUser } = useCurrentUser();
   if (!currentUser) return <Spinner />;

   const inputRef = useRef<HTMLInputElement>(null);

   const [currentConversation, setCurrentConversation] = useState<Nullable<Conversation>>(null);
   const [userToCreateConversationWith, setUserToCreateConversationWith] =
      useState<Nullable<Pick<User, 'id' | 'userName'>>>(null);
   const [messageToUpdate, setMessageToUpdate] = useState<Nullable<Message>>(null);
   const [inputPayload, setInputPayload] = useState<InputPayload>({
      text: null,
   });

   const setInputPayloadFunc = async (payload: Partial<InputPayload>): Promise<void> => {
      setInputPayload((prevState) => ({ ...prevState, ...payload }));
   };
   const setUserToCreateConversationFunc = (user: Nullable<Pick<User, 'id' | 'userName'>>) => {
      setUserToCreateConversationWith(user);
   };
   const setMessageToUpdateFunc = (message: Nullable<Message>) => {
      setMessageToUpdate(message);
      setInputPayloadFunc({
         text: message?.content,
      }).then(() => {
         if (inputRef.current) inputRef.current.focus();
      });
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
            inputPayload: inputPayload,
            setInputPayload: setInputPayloadFunc,
            inputRef: inputRef,
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
