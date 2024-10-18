import { Conversation } from '@shared/types/conversation';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { ConversationType } from '@shared/types/conversation.ts';
import { useConversationParticipants } from '@webapp/src/api/conversation-participant/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import UserAvatar from '@webapp/src/components/UserAvatar.tsx';
import { LuMegaphone, LuUsers2 } from 'react-icons/lu';

export default function ConversationTile({ conversation }: { conversation: Conversation }) {
   const { setCurrentConversation, setMessageToUpdate, setUserToCreateConversation, currentConversation } =
      useChatContext();

   const { data: participants } = useConversationParticipants(conversation.id);

   const returnConversationTitle = () => {
      if (!participants) return <Spinner />;
      else if (conversation.conversationType === ConversationType.P2P) {
         return (
            <div className="flex flex-row gap-2">
               <UserAvatar firstWord={participants[0].user.firstName} secondWord={participants[0].user.lastName} />
               <div className="flex flex-col justify-between">
                  <p>{`${participants[0].user.firstName} ${participants[0].user.lastName}`}</p>
                  <p>{/*LAST MESSAGE HERE*/}</p>
               </div>
            </div>
         );
      } else if (
         conversation.conversationType === ConversationType.GROUP ||
         conversation.conversationType === ConversationType.CHANNEL
      ) {
         return (
            <div className="flex flex-row gap-2">
               <UserAvatar firstWord={conversation.title} />
               <div className="flex flex-col justify-between">
                  <div className="flex flex-row items-center gap-1">
                     {conversation.conversationType === ConversationType.CHANNEL ? <LuMegaphone /> : <LuUsers2 />}
                     {conversation.title}
                  </div>
                  <p>{/*LAST MESSAGE HERE*/}</p>
               </div>
            </div>
         );
      }
   };
   return (
      <div
         className={`flex w-full flex-row rounded-none text-general-dark hover:bg-general-green/[0.7] p-3 cursor-pointer transition-colors ${conversation.id === currentConversation?.id ? 'bg-general-green/[0.7] hover:border-transparent' : ''}`}
         onClick={() => {
            setCurrentConversation(conversation);
            setMessageToUpdate(null);
            setUserToCreateConversation(null);
         }}
      >
         <div className="w-full truncate flex items-start">{returnConversationTitle()}</div>
      </div>
   );
}
