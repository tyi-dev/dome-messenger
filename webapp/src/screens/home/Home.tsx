import { useCurrentUser, useUpdateLastSeen } from '@webapp/src/api/user/hooks';
import HomeSidebar from '@webapp/src/components/home-sidebar/HomeSidebar';
import Spinner from '@webapp/src/components/Spinner';
import ChatLayout from '@webapp/src/components/ChatLayout';
import { SearchUserRes } from '@shared/types/user';
import { useRef, useState } from 'react';
import { Conversation } from '@shared/types/conversation';
import { ChatContext, InputPayload } from '@webapp/src/components/chat-components/chat-context';
import { Nullable } from '@shared/types/nullable';
import { Message } from '@shared/types/message';
export default function HomePage() {
   const { data: currentUser } = useCurrentUser();
   if (!currentUser) return <Spinner />;
   useUpdateLastSeen();

   const inputRef = useRef<HTMLInputElement>(null);
   const conversationBottomRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
      if (conversationBottomRef?.current) {
         conversationBottomRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
         });
      }
   };

   const [currentConversation, setCurrentConversation] = useState<Nullable<Conversation>>(null);
   const [userToCreateConversationWith, setUserToCreateConversationWith] = useState<Nullable<SearchUserRes>>(null);
   const [messageToUpdate, setMessageToUpdate] = useState<Nullable<Message>>(null);
   const [inputPayload, setInputPayload] = useState<InputPayload>({
      text: null,
   });
   const [isSidebarOpen, setSidebarOpen] = useState(false);

   const setInputPayloadFunc = async (payload: Partial<InputPayload>): Promise<void> => {
      setInputPayload((prevState) => ({ ...prevState, ...payload }));
   };
   const setUserToCreateConversationFunc = (user: Nullable<SearchUserRes>) => {
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
            conversationBottomRef: conversationBottomRef,
            scrollToBottom: scrollToBottom,
            isSidebarOpen: isSidebarOpen,
            setSidebarOpen: setSidebarOpen,
         }}
      >
         <div className="flex flex-col lg:flex-row w-full h-full">
            <HomeSidebar />
            <div className="w-full h-full bg-general-light">
               <ChatLayout />
            </div>
         </div>
      </ChatContext.Provider>
   );
}
