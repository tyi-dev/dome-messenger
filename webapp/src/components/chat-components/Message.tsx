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
            className={`flex flex-col gap-2 bg-general-dark/[0.1] ${isMessageMine() ? 'ml-auto bg-general-blue/[0.2]' : 'mr-auto bg-general-black/[0.2]'} ${messageToUpdate?.id === message.id ? 'animate-pulse' : ''} py-2 px-4 rounded-xl max-w-96`}
         >
            <div className={`flex ${isMessageMine() ? 'ml-auto' : 'mr-auto'} text-general-dark font-semibold text-sm`}>
               {`${user?.firstName} ${user?.lastName}`}
            </div>
            <div className={`flex ${isMessageMine() ? 'ml-auto' : 'mr-auto'} text-general-dark/[0.9]`}>
               {message.content}
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
               <DropdownMenuItem onClick={() => deleteMessage()}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      );
   else return <Message />;
}
