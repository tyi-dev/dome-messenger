import ConversationsList from '@webapp/src/components/chat-components/ConversationsList';
import CurrentConversation from '@webapp/src/components/chat-components/CurrentConversation';
import MessageOperationsInput from '@webapp/src/components/chat-components/MessageOperationsInput';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import CurrentConversationHeader from '@webapp/src/components/chat-components/CurrentConversationHeader.tsx';

export default function ChatLayout() {
   const { currentConversation, userToCreateConversationWith } = useChatContext();

   return (
      <div className="w-full flex flex-row h-full">
         <ConversationsList />
         <div className="w-full flex flex-col h-full">
            {currentConversation || userToCreateConversationWith ? <CurrentConversationHeader /> : null}
            <CurrentConversation />
            {currentConversation || userToCreateConversationWith ? <MessageOperationsInput /> : null}
         </div>
      </div>
   );
}
