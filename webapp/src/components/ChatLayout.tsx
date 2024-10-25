import ConversationsList from '@webapp/src/components/chat-components/conversationList/ConversationsList';
import CurrentConversation from '@webapp/src/components/chat-components/currentConversation/CurrentConversation';
import MessageOperationsInput from '@webapp/src/components/chat-components/MessageOperationsInput';
import { useChatContext } from '@webapp/src/components/chat-components/chat-context.tsx';
import CurrentConversationHeader from '@webapp/src/components/chat-components/currentConversation/CurrentConversationHeader.tsx';
import EditingMessageBar from '@webapp/src/components/chat-components/EditingMessageBar.tsx';
import { useConversationParticipant } from '@webapp/src/api/conversation-participant/hooks.ts';
import { Conversation, ConversationType } from '@shared/types/conversation.ts';
import { ConversationParticipantRole } from '@shared/types/conversation-participant.ts';
import ConversationListHeader from '@webapp/src/components/chat-components/conversationList/ConversationListHeader.tsx';

export default function ChatLayout() {
   const { currentConversation, userToCreateConversationWith } = useChatContext();
   const { data: currentParticipant } = useConversationParticipant(currentConversation?.id);

   const isUserAllowedToType = (currentConversationLocal: Conversation | null) => {
      if (!currentConversationLocal) return false;

      switch (currentConversationLocal.conversationType) {
         case ConversationType.P2P:
            return true;
         case ConversationType.GROUP:
            return true;
         case ConversationType.CHANNEL:
            return currentParticipant?.role === ConversationParticipantRole.OWNER;
         default:
            return false;
      }
   };

   return (
      <div className="w-full flex flex-row h-full">
         <div
            className={`lg:flex w-full lg:w-auto flex-col h-full border-r border-general-dark/[0.2] ${currentConversation ? 'hidden' : 'flex'}`}
         >
            <ConversationListHeader />
            <ConversationsList />
         </div>
         <div className={`w-full lg:flex flex-col h-full ${currentConversation ? 'flex' : 'hidden'}`}>
            {currentConversation || userToCreateConversationWith ? <CurrentConversationHeader /> : null}
            <CurrentConversation />
            <EditingMessageBar />
            {userToCreateConversationWith || isUserAllowedToType(currentConversation) ? (
               <MessageOperationsInput />
            ) : null}
         </div>
      </div>
   );
}
