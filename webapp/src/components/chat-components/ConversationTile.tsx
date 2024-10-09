import { Conversation } from '@shared/types/conversation';
import { Button } from '../ui/button.tsx';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { ConversationType } from '@shared/types/conversation.ts';
import { useConversationParticipants } from '@webapp/src/api/conversation-participant/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';

export default function ConversationTile({ conversation }: { conversation: Conversation }) {
   const { setCurrentConversation, setMessageToUpdate, setUserToCreateConversation } = useChatContext();

   const { data: participants } = useConversationParticipants(conversation.id);

   const returnConversationTitle = () => {
      if (!participants) return <Spinner />;

      switch (conversation.conversationType) {
         case ConversationType.P2P:
            return `${participants[0].user.firstName} ${participants[0].user.lastName}`;
         case ConversationType.CHANNEL:
            return conversation.title;
         case ConversationType.GROUP:
            return conversation.title;
         default:
            return <Spinner />;
      }
   };
   return (
      <Button
         className="flex w-full flex-col"
         onClick={() => {
            setCurrentConversation(conversation);
            setMessageToUpdate(null);
            setUserToCreateConversation(null);
         }}
      >
         <p>{returnConversationTitle()}</p>
      </Button>
   );
}
