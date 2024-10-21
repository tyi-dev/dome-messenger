import { Message } from '@shared/types/message';
import { useUserById } from '@webapp/src/api/user/hooks.ts';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@webapp/src/components/ui/dropdown-menu';
import { useDeleteMessage } from '@webapp/src/api/message/hooks.ts';
import { format } from 'date-fns';
import { LuCheck, LuCheckCheck } from 'react-icons/lu';
import { ConversationType } from '@shared/types/conversation.ts';
import UserProfileDialog from '@webapp/src/components/chat-components/dialogs/UserProfileDialog.tsx';
import { mutate } from 'swr';
import { API_MESSAGE_URL } from '@webapp/src/api/message/actions.ts';

export default function MessageComponent({ message }: { message: Message }) {
   const { currentUser, setMessageToUpdate, messageToUpdate, currentConversation } = useChatContext();
   const { data: user } = useUserById(message.senderId);
   const { trigger: deleteMessage } = useDeleteMessage(message.id, message.conversationId);

   const isMessageMine = () => {
      return user?.id === currentUser.id;
   };

   function Message() {
      return (
         <div
            className={`flex flex-col gap-2 ${isMessageMine() ? 'ml-auto bg-general-blue/[0.2]' : 'mr-auto bg-general-dark/[0.1]'} ${messageToUpdate?.id === message.id ? 'animate-pulse' : ''} py-2 px-4 rounded-xl max-w-96`}
         >
            {currentConversation?.conversationType !== ConversationType.P2P && user ? (
               <UserProfileDialog
                  user={user}
                  trigger={
                     <div className={`flex w-full justify-start text-general-dark font-semibold text-sm`}>
                        {`${user?.firstName} ${user?.lastName}`}
                     </div>
                  }
               />
            ) : null}

            <p
               className="flex text-general-dark/[0.9] text-balance items-start justify-start text-left"
               style={{ wordBreak: 'break-word' }}
            >
               {message.content}
            </p>
            <div className={`w-full justify-end items-center flex flex-row gap-2`}>
               {message.editedAt ? <p className="text-general-dark/[0.5] text-sm">edited</p> : null}
               <p className="flex justify-end text-general-dark/[0.5]">{format(message.createdAt, 'H:mm')}</p>
               {message.status.find((item) => item.readAt) ? (
                  <LuCheckCheck className="text-general-dark" />
               ) : (
                  <LuCheck className="text-general-dark" />
               )}
            </div>
         </div>
      );
   }

   if (isMessageMine())
      return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className="inline-flex max-w-fit ml-auto">
                  <Message />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuItem onClick={() => setMessageToUpdate(message)}>Edit</DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() =>
                     deleteMessage().then(() => {
                        mutate(`${API_MESSAGE_URL.GET_LAST_CONVERSATION_MESSAGE}/${currentConversation?.id}`);
                     })
                  }
               >
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      );
   else return <Message />;
}
