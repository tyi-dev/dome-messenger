import ConversationsList from '@webapp/src/components/chat-components/conversationList/ConversationsList';
import CurrentConversation from '@webapp/src/components/chat-components/currentConversation/CurrentConversation';
import MessageOperationsInput from '@webapp/src/components/chat-components/MessageOperationsInput';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import CurrentConversationHeader from '@webapp/src/components/chat-components/currentConversation/CurrentConversationHeader.tsx';
import EditingMessageBar from '@webapp/src/components/chat-components/EditingMessageBar.tsx';
import { useConversationParticipant } from '@webapp/src/api/conversation-participant/hooks.ts';
import { Conversation, ConversationType } from '@shared/types/conversation.ts';
import { ConversationParticipantRole } from '@shared/types/conversation-participant.ts';
/*import ConversationsHeader from '@webapp/src/components/chat-components/conversationList/Header.tsx';*/

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
         <div className="flex flex-col items-center justify-start border-r border-general-dark/[0.2]">
            {/* <ConversationsHeader />*/}
            <ConversationsList />
         </div>

         <div className="w-full flex flex-col h-full">
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
