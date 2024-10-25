import { useSearchUsers } from '@webapp/src/api/user/hooks.ts';
import { useState } from 'react';
import { useChatContext } from '@webapp/src/components/chat-components/chat-context.tsx';
import { Tabs, TabsList, TabsTrigger } from '@webapp/src/components/ui/tabs';
import { Conversation, ConversationType } from '@shared/types/conversation.ts';
import { useCreateConversation } from '@webapp/src/api/conversation/hooks.ts';
import { ConversationSchemaResultType } from '@shared/src/schemas/conversationOperations.ts';
import { mutate } from 'swr';
import { API_CONVERSATION_URL } from '@webapp/src/api/conversation/actions.ts';
import ParticipantsSelectList from '@webapp/src/components/participantsLists/ParticipantsSelectList.tsx';
import { useDialogContext } from '@webapp/src/components/dialog/dialog-context.tsx';

export default function NewConversationDialog() {
   const { setUserToCreateConversation, currentUser, setCurrentConversation } = useChatContext();
   const { goBack } = useDialogContext();
   const [currentConversationType, setCurrentConversationType] = useState<ConversationType>(ConversationType.P2P);
   const { data: users } = useSearchUsers(currentConversationType);
   const { trigger: createConversation } = useCreateConversation();

   const onClose = () => {
      setCurrentConversationType(ConversationType.P2P);
      goBack();
   };

   const onSubmit = (data: ConversationSchemaResultType) => {
      if (currentConversationType === ConversationType.P2P) {
         setUserToCreateConversation(data.participants[0]);
         onClose();
      }
      if (currentConversationType === ConversationType.GROUP || currentConversationType === ConversationType.CHANNEL) {
         createConversation({
            title: data.title ? data.title : '',
            participants: [...data.participants, currentUser],
            conversationType: currentConversationType,
         }).then((conversation: Conversation) => {
            mutate(API_CONVERSATION_URL.MY_CONVERSATIONS);
            setCurrentConversation(conversation);
         });
         onClose();
      }
   };

   return (
      <div className="flex flex-col gap-6">
         <Tabs
            defaultValue={ConversationType.P2P}
            onValueChange={(value) => {
               setCurrentConversationType(value as ConversationType);
            }}
         >
            <TabsList className="w-full">
               <TabsTrigger value={ConversationType.P2P} className="w-full">
                  P2P
               </TabsTrigger>
               <TabsTrigger value={ConversationType.GROUP} className="w-full">
                  Group
               </TabsTrigger>
               <TabsTrigger value={ConversationType.CHANNEL} className="w-full">
                  Channel
               </TabsTrigger>
            </TabsList>
         </Tabs>
         <ParticipantsSelectList
            users={users}
            conversationType={currentConversationType}
            onSubmit={onSubmit}
            onCancel={() => onClose()}
         />
      </div>
   );
}
