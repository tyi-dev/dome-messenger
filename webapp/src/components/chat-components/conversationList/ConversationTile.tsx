import { Conversation } from '@shared/types/conversation';
import { Button } from '@webapp/src/components/ui/button';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { ConversationType } from '@shared/types/conversation.ts';
import { useConversationParticipants } from '@webapp/src/api/conversation-participant/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
/*import ChatAvatar from '@webapp/src/components/UserAvatar.tsx';*/
import { LuUsers2 } from 'react-icons/lu';
import { LuMegaphone } from 'react-icons/lu';

export default function ConversationTile({ conversation }: { conversation: Conversation }) {
   const { setCurrentConversation, setMessageToUpdate, setUserToCreateConversation, currentConversation } =
      useChatContext();

   const { data: participants } = useConversationParticipants(conversation.id);

   const returnConversationTitle = () => {
      if (!participants) return <Spinner />;

      switch (conversation.conversationType) {
         case ConversationType.P2P:
            return `${participants[0].user.firstName} ${participants[0].user.lastName}`;
         case ConversationType.CHANNEL:
            return (
               <div className="flex flex-row">
                  <LuMegaphone />
                  {conversation.title}
               </div>
            );
         case ConversationType.GROUP:
            return (
               <div className="flex flex-row">
                  <LuUsers2 />
                  {conversation.title}
               </div>
            );
         default:
            return <Spinner />;
      }
   };
   return (
      <Button
         className={`flex w-full flex-row rounded-none ${conversation.id === currentConversation?.id ? 'bg-general-blue hover:border-transparent' : ''}`}
         onClick={() => {
            setCurrentConversation(conversation);
            setMessageToUpdate(null);
            setUserToCreateConversation(null);
         }}
      >
         {/*<ChatAvatar />*/}
         <div className="w-full truncate flex items-start">{returnConversationTitle()}</div>
      </Button>
   );
}
