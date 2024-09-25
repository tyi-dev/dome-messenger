import { Input } from '@webapp/src/components/ui/input.tsx';
import { LuSendHorizonal } from 'react-icons/lu';
import { useState } from 'react';
import { useCreateMessage } from '../../api/message/hooks.ts';
import { Conversation } from '@shared/types/conversation.ts';
import { toast } from '@webapp/src/hooks/use-toast.ts';
import { mutate } from 'swr';
import { API_MESSAGE_URL } from '../../api/message/actions.ts';

export default function MessageOperationsInput(props: { conversation: Conversation | undefined }) {
   const { conversation } = props;
   const [inputValue, setInputValue] = useState('');
   const { trigger: sendMessage } = useCreateMessage();
   const onMessageSend = () => {
      if (!conversation) {
         toast({
            variant: 'destructive',
            title: 'Select conversation first',
         });
         return;
      }
      sendMessage({
         content: inputValue,
         conversationId: conversation.id,
      });
      mutate(`${API_MESSAGE_URL.GET_MESSAGES}/${conversation.id}`);
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
