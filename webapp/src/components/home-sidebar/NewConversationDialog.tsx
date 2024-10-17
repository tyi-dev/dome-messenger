import { useSearchUsers } from '@webapp/src/api/user/hooks.ts';
import SideBarButton from './SideBarButton.tsx';
import { LuPlus } from 'react-icons/lu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@webapp/src/components/ui/dialog';
import { useState } from 'react';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { Tabs, TabsList, TabsTrigger } from '@webapp/src/components/ui/tabs';
import { Conversation, ConversationType } from '@shared/types/conversation.ts';
import { useCreateConversation } from '@webapp/src/api/conversation/hooks.ts';
import UsersList from '@webapp/src/components/UsersSelectList.tsx';
import { ConversationSchemaResultType } from '@shared/src/schemas/conversationOperations.ts';
import { mutate } from 'swr';
import { API_CONVERSATION_URL } from '@webapp/src/api/conversation/actions.ts';

export default function NewConversationDialog() {
   const [currentConversationType, setCurrentConversationType] = useState<ConversationType>(ConversationType.P2P);
   const { data: users } = useSearchUsers(currentConversationType);
   const [isDialogOpen, setDialogOpen] = useState(false);
   const { setUserToCreateConversation, currentUser, setCurrentConversation } = useChatContext();
   const { trigger: createConversation } = useCreateConversation();

   const onSubmit = (data: ConversationSchemaResultType) => {
      if (currentConversationType === ConversationType.P2P) {
         setUserToCreateConversation(data.participants[0]);
         setDialogOpen(false);
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
         setDialogOpen(false);
      }
   };

   return (
      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(!isDialogOpen)}>
         <DialogTrigger asChild>
            <div>
               <SideBarButton title={`Create conversation`} icon={<LuPlus className="text-general-dark" />} />
            </div>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Start a new chat</DialogTitle>
            </DialogHeader>
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
            <UsersList
               users={users}
               conversationType={currentConversationType}
               onSubmit={onSubmit}
               onCancel={() => setDialogOpen(false)}
            />
         </DialogContent>
      </Dialog>
   );
}
