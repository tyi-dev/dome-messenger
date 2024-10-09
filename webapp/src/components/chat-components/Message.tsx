import { Message } from '@shared/types/message';
import { useUserById } from '@webapp/src/api/user/hooks.ts';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
   DropdownMenuItem,
} from '@webapp/src/components/ui/dropdown-menu';
import { useDeleteMessage } from '@webapp/src/api/message/hooks.ts';

export default function MessageComponent({ message }: { message: Message }) {
   const { currentUser, setMessageToUpdate, messageToUpdate } = useChatContext();
   const { data: user } = useUserById(message.senderId);
   const { trigger: deleteMessage } = useDeleteMessage(message.id, message.conversationId);

   const isMessageMine = () => {
      return user?.id === currentUser.id;
   };

   function Message() {
      return (
         <div
            className={`flex flex-col ${isMessageMine() ? 'ml-auto border-general-orange' : 'mr-auto border-general-blue'} ${messageToUpdate?.id === message.id ? 'animate-pulse' : ''} border-2 py-2 px-4 rounded-xl max-w-96`}
         >
            <div className={`flex ${isMessageMine() ? 'ml-auto' : 'mr-auto'} text-general-dark`}>{user?.userName}</div>
            <div className={`flex ${isMessageMine() ? 'ml-auto' : 'mr-auto'} text-general-dark`}>{message.content}</div>
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
               <DropdownMenuItem onClick={() => deleteMessage()}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      );
   else return <Message />;
}
