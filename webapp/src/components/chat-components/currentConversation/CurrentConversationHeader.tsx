import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { ConversationType } from '@shared/types/conversation.ts';
import { useConversationParticipants } from '@webapp/src/api/conversation-participant/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import returnLastSeen from '@shared/src/utils/lastSeen.ts';
import UserProfileDialog from '@webapp/src/components/chat-components/dialogs/UserProfileDialog.tsx';
import ChatDetailsDialog from '@webapp/src/components/chat-components/dialogs/ChatDetailsDialog.tsx';

export default function CurrentConversationHeader() {
   const { currentConversation, userToCreateConversationWith } = useChatContext();
   const { data: participants } = useConversationParticipants(currentConversation?.id);

   if (!participants || !currentConversation) return <Spinner />;
   if (participants.length === 0) return null;

   const containerClassName = 'w-full flex flex-col border-b border-general-dark/[0.2] items-start p-2 pl-6';
   const titleClassName = 'text-general-dark';
   const secondaryTitleClassName = 'text-general-dark/[0.6]';

   if (userToCreateConversationWith)
      return (
         <div className={containerClassName}>
            <p className={titleClassName}>{`${userToCreateConversationWith.userName}`}</p>
         </div>
      );

   switch (currentConversation?.conversationType) {
      case ConversationType.P2P:
         return (
            <UserProfileDialog
               user={participants[0].user}
               trigger={
                  <div className={containerClassName}>
                     <div className="flex flex-row gap-2 items-baseline">
                        <p
                           className={titleClassName}
                        >{`${participants[0].user.firstName} ${participants[0].user.lastName}`}</p>
                        <p className="text-general-dark/[0.6] text-sm">{participants[0].user.userName}</p>
                     </div>
                     <p className={secondaryTitleClassName}>{returnLastSeen(participants[0].user)}</p>
                  </div>
               }
            />
         );
      default:
         return (
            <ChatDetailsDialog
               conversation={currentConversation}
               participants={participants}
               trigger={
                  <div className={containerClassName}>
                     <p className={titleClassName}>{currentConversation?.title}</p>
                     <p className={secondaryTitleClassName}>{participants.length} members</p>
                  </div>
               }
            />
         );
   }
}
