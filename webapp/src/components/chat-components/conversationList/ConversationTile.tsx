import { Conversation } from '@shared/types/conversation';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { ConversationType } from '@shared/types/conversation.ts';
import { useConversationParticipants } from '@webapp/src/api/conversation-participant/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import UserAvatar from '@webapp/src/components/UserAvatar.tsx';
import { LuMegaphone, LuUsers2 } from 'react-icons/lu';
import { useLastConversationMessage } from '@webapp/src/api/message/hooks.ts';
import { format } from 'date-fns';
import { LuCheck, LuCheckCheck } from 'react-icons/lu';

export default function ConversationTile({ conversation }: { conversation: Conversation }) {
   const { setCurrentConversation, setMessageToUpdate, setUserToCreateConversation, currentConversation, currentUser } =
      useChatContext();

   const { data: participants } = useConversationParticipants(conversation.id);
   const { data: lastMessage } = useLastConversationMessage(conversation.id);

   const renderReadChecks = () => {
      if (lastMessage?.senderId === currentUser?.id) {
         if (lastMessage?.status.find((item) => item.readAt)) return <LuCheckCheck className="text-general-dark" />;
         return <LuCheck className="text-general-dark" />;
      }
   };

   const returnConversationTitle = () => {
      if (!participants) return <Spinner />;
      else if (conversation.conversationType === ConversationType.P2P) {
         return (
            <div className="flex flex-row gap-2 w-full">
               <UserAvatar firstWord={participants[0].user.firstName} secondWord={participants[0].user.lastName} />
               <div className="flex flex-col justify-between w-full">
                  <div className="flex w-full justify-between text-general-dark">
                     <p className="text-general-dark">{`${participants[0].user.firstName} ${participants[0].user.lastName}`}</p>
                     <div className="flex items-center gap-1">
                        {renderReadChecks()}
                        <p className="text-general-dark/[0.5] text-sm">
                           {format(lastMessage ? lastMessage.createdAt : new Date(), 'H:mm')}
                        </p>
                     </div>
                  </div>
                  <p className="flex truncate w-full justify-start text-general-dark/[0.7]">{lastMessage?.content}</p>
               </div>
            </div>
         );
      } else if (
         conversation.conversationType === ConversationType.GROUP ||
         conversation.conversationType === ConversationType.CHANNEL
      ) {
         return (
            <div className="flex flex-row gap-2 w-full">
               <UserAvatar firstWord={conversation.title} />
               <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-row items-center gap-1 truncate w-full justify-between text-general-dark">
                     <div className="flex flex-row items-center gap-1 truncate w-full">
                        {conversation.conversationType === ConversationType.CHANNEL ? <LuMegaphone /> : <LuUsers2 />}
                        {conversation.title}
                     </div>
                     <div className="flex items-center gap-1">
                        {renderReadChecks()}
                        <p className="text-general-dark/[0.5] text-sm">
                           {format(lastMessage ? lastMessage.createdAt : new Date(), 'H:mm')}
                        </p>
                     </div>
                  </div>
                  <p className="flex truncate w-full justify-start text-general-dark/[0.7]">{lastMessage?.content}</p>
               </div>
            </div>
         );
      }
   };
   return (
      <div
         className={`flex w-full flex-row rounded-none text-general-dark hover:bg-general-gray/[0.5] p-3 cursor-pointer transition-colors ${conversation.id === currentConversation?.id ? 'bg-general-gray/[0.5] hover:border-transparent' : ''}`}
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
