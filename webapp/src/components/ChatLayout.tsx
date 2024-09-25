import ConversationsList from '@webapp/src/components/chat-components/ConversationsList';
import CurrentConversation from './chat-components/CurrentConversation';
import MessageOperationsInput from './chat-components/MessageOperationsInput';
import { User } from '@shared/types/user.ts';
import { useState } from 'react';
import { Conversation } from '@shared/types/conversation';

export default function ChatLayout(props: { user: User }) {
   const { user } = props;
   const [currentConversation, setCurrentConversation] = useState<Conversation>();

   const setCurrentChat = (conversation: Conversation) => {
      setCurrentConversation(conversation);
   };

   return (
      <div className="w-full flex flex-row h-full">
         <ConversationsList setConversation={setCurrentChat} />
         <div className="w-full flex flex-col h-full">
            <CurrentConversation conversation={currentConversation} />
            <MessageOperationsInput conversation={currentConversation} />
         </div>
      </div>
   );
}
