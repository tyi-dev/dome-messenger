import { Message } from '@shared/types/message';
import { useUserById } from '@webapp/src/api/user/hooks.ts';
import { useChatContext } from '@webapp/src/components/chat-components/chat-context.tsx';
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from '@webapp/src/components/ui/context-menu';
import { useDeleteMessage } from '@webapp/src/api/message/hooks.ts';
import { format } from 'date-fns';
import { LuCheck, LuCheckCheck, LuPenLine, LuTrash2 } from 'react-icons/lu';
import { ConversationType } from '@shared/types/conversation.ts';
import { mutate } from 'swr';
import { API_MESSAGE_URL } from '@webapp/src/api/message/actions.ts';
import { DIALOG_TYPE, useDialogContext } from '@webapp/src/components/dialog/dialog-context.tsx';

export default function MessageComponent({ message }: { message: Message }) {
   const { currentUser, setMessageToUpdate, messageToUpdate, currentConversation } = useChatContext();
   const { addToDialogHistory } = useDialogContext();
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
               <div
                  className={`flex w-full justify-start text-general-dark font-semibold text-sm cursor-pointer`}
                  onClick={() =>
                     addToDialogHistory({
                        currentRender: DIALOG_TYPE.USER_DETAILS,
                        title: 'User info',
                        data: user,
                     })
                  }
               >
                  {`${user?.firstName} ${user?.lastName}`}
               </div>
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
         <ContextMenu>
            <ContextMenuTrigger asChild>
               <div className="inline-flex max-w-fit ml-auto">
                  <Message />
               </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
               <ContextMenuItem onClick={() => setMessageToUpdate(message)}>
                  <LuPenLine />
                  Edit
               </ContextMenuItem>
               <ContextMenuItem
                  onClick={() =>
                     deleteMessage().then(() => {
                        mutate(`${API_MESSAGE_URL.GET_LAST_CONVERSATION_MESSAGE}/${currentConversation?.id}`);
                     })
                  }
               >
                  <LuTrash2 />
                  Delete
               </ContextMenuItem>
            </ContextMenuContent>
         </ContextMenu>
      );
   else return <Message />;
}
