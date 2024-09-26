import { Input } from '@webapp/src/components/ui/input.tsx';
import { LuSendHorizonal } from 'react-icons/lu';
import { useState } from 'react';
import { useCreateMessage } from '@webapp/src/api/message/hooks.ts';
import { toast } from '@webapp/src/hooks/use-toast.ts';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { useCreateConversation } from '@webapp/src/api/conversation/hooks.ts';
import { useUpdateMessage } from '@webapp/src/api/message/hooks.ts';

export default function MessageOperationsInput() {
   const { currentConversation, messageToUpdate, userToCreateConversationWith, currentUser } = useChatContext();
   const [inputValue, setInputValue] = useState('');
   const { trigger: sendMessage } = useCreateMessage();
   const { trigger: createConversation } = useCreateConversation();
   const { trigger: updateMessage } = useUpdateMessage(messageToUpdate?.id);
   const onMessageSend = () => {
      if (userToCreateConversationWith) {
         createConversation({
            participants: [currentUser, userToCreateConversationWith],
            title: 'New Conversation',
         }).then((response) => {
            sendMessage({
               content: inputValue,
               conversationId: response.id,
            });
         });
         return;
      }
      if (messageToUpdate) {
         updateMessage(messageToUpdate);
         return;
      }
      if (currentConversation) {
         sendMessage({
            content: inputValue,
            conversationId: currentConversation.id,
         });
         return;
      } else if (!userToCreateConversationWith && !messageToUpdate) {
         toast({
            variant: 'destructive',
            title: 'Select conversation first',
         });
         return;
      }
      toast({
         variant: 'destructive',
         title: 'Woopsie something went wrong.',
      });
   };

   return (
      <div className="w-full flex flex-row border-t border-general-dark ">
         <Input
            placeholder="Write a message..."
            className="w-full py-5 text-general-dark rounded-none focus-visible:ring-0 border-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
         />
         <div
            className="flex justify-center items-center p-2 bg-general-light hover:cursor-pointer"
            onClick={onMessageSend}
         >
            <LuSendHorizonal className="w-5 h-5 text-general-dark" />
         </div>
      </div>
   );
}
