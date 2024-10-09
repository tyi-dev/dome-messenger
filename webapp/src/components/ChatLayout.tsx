import ConversationsList from '@webapp/src/components/chat-components/ConversationsList';
import CurrentConversation from '@webapp/src/components/chat-components/CurrentConversation';
import MessageOperationsInput from '@webapp/src/components/chat-components/MessageOperationsInput';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';

export default function ChatLayout() {
   const { currentConversation, userToCreateConversationWith } = useChatContext();

   return (
      <div className="w-full flex flex-row h-full">
         <ConversationsList />
         <div className="w-full flex flex-col h-full">
            <CurrentConversation />
            {currentConversation || userToCreateConversationWith ? <MessageOperationsInput /> : null}
         </div>
      </div>
   );
}
