import { Input } from '@webapp/src/components/ui/input.tsx';
import { LuSendHorizonal } from 'react-icons/lu';
import { KeyboardEventHandler } from 'react';
import { useCreateMessage } from '@webapp/src/api/message/hooks.ts';
import { toast } from '@webapp/src/hooks/use-toast.ts';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { useCreateConversation } from '@webapp/src/api/conversation/hooks.ts';
import { useUpdateMessage } from '@webapp/src/api/message/hooks.ts';
import { mutate } from 'swr';
import { API_CONVERSATION_PARTICIPANT_URL } from '@webapp/src/api/conversation-participant/actions.ts';

export default function MessageOperationsInput() {
   const {
      currentConversation,
      messageToUpdate,
      userToCreateConversationWith,
      currentUser,
      setMessageToUpdate,
      inputPayload: inputValue,
      setInputPayload: setInputValue,
      inputRef,
   } = useChatContext();
   const { trigger: sendMessage } = useCreateMessage();
   const { trigger: createConversation } = useCreateConversation();
   const { trigger: updateMessage } = useUpdateMessage(messageToUpdate?.id);

   const handleEnterPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key === 'Enter') onMessageSend();
      if (event.key === 'Escape') setMessageToUpdate(null);
   };

   const clearInputValues = () => {
      setInputValue({
         text: null,
      });
   };

   const onMessageSend = () => {
      if (inputValue.text === '' || !inputValue.text) return;
      if (userToCreateConversationWith) {
         createConversation({
            participants: [currentUser, userToCreateConversationWith],
            title: 'New Conversation',
         }).then((response) => {
            sendMessage({
               content: inputValue.text ? inputValue.text : '',
               conversationId: response.id,
            }).then(() => mutate(API_CONVERSATION_PARTICIPANT_URL.GET_PARTICIPANTS));
         });
         clearInputValues();
         return;
      }
      if (messageToUpdate) {
         updateMessage({
            content: inputValue.text,
            id: messageToUpdate.id,
            conversationId: messageToUpdate.conversationId,
         });
         setMessageToUpdate(null);
         clearInputValues();
         return;
      }
      if (currentConversation) {
         sendMessage({
            content: inputValue.text,
            conversationId: currentConversation.id,
         });
         clearInputValues();
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
      <div className="w-full flex flex-row border-t border-general-dark/[0.2] ">
         <Input
            placeholder="Write a message..."
            className="w-full py-5 text-general-dark rounded-none focus-visible:ring-0 border-none"
            value={inputValue.text ? inputValue.text : ''}
            ref={inputRef}
            onChange={(e) =>
               setInputValue({
                  text: e.target.value,
               })
            }
            onClick={(e) => console.log(e)}
            onKeyDown={handleEnterPress}
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
