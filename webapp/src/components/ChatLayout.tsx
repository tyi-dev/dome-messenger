import ConversationsList from '@webapp/src/components/chat-components/ConversationsList';
import CurrentConversation from './chat-components/CurrentConversation';
import MessageOperationsInput from './chat-components/MessageOperationsInput';

export default function ChatLayout() {
   return (
      <div className="w-full flex flex-row h-full">
         <ConversationsList />
         <div className="w-full flex flex-col h-full">
            <CurrentConversation />
            <MessageOperationsInput />
         </div>
      </div>
   );
}
