import { useSearchUsers } from '@webapp/src/api/user/hooks.ts';
import SideBarButton from './SideBarButton.tsx';
import { LuPlus } from 'react-icons/lu';
import { Button } from '@webapp/src/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@webapp/src/components/ui/dialog';
import { useState } from 'react';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { SearchUserRes } from '@shared/types/user.ts';
import { Tabs, TabsList, TabsTrigger } from '@webapp/src/components/ui/tabs';
import { ConversationType } from '@shared/types/conversation.ts';
import { useCreateConversation } from '@webapp/src/api/conversation/hooks.ts';
import UsersList from '@webapp/src/components/UsersSelectList.tsx';
import { Input } from '@webapp/src/components/ui/input.tsx';

export default function NewConversationDialog() {
   const [currentConversationType, setCurrentConversationType] = useState<ConversationType>(ConversationType.P2P);
   const { data: users } = useSearchUsers(currentConversationType);
   const [isDialogOpen, setDialogOpen] = useState(false);
   const [userToCreateConversationWith, setUserToCreateConversationWith] = useState<SearchUserRes | null>(null);
   const [usersToCreateConversationWith, setUsersToCreateConversationWith] = useState<SearchUserRes[]>([]);
   const [nameInputValue, setNameInputValue] = useState<string>('');
   const [renderErrors, setRenderErrors] = useState<boolean>(false);
   const { setUserToCreateConversation, currentUser } = useChatContext();
   const { trigger: createConversation } = useCreateConversation();

   const onConfirm = () => {
      if (currentConversationType === ConversationType.P2P && userToCreateConversationWith) {
         setUserToCreateConversation(userToCreateConversationWith);
         setDialogOpen(false);
      } else setRenderErrors(true);
      if (
         currentConversationType === ConversationType.GROUP ||
         (currentConversationType === ConversationType.CHANNEL &&
            usersToCreateConversationWith.length > 0 &&
            nameInputValue.length > 0)
      ) {
         createConversation({
            title: nameInputValue,
            participants: [...usersToCreateConversationWith, currentUser],
            conversationType: currentConversationType,
         });
         setDialogOpen(false);
      } else setRenderErrors(true);
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
                  setUsersToCreateConversationWith([]);
                  setUserToCreateConversation(null);
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
            {currentConversationType === ConversationType.GROUP ||
            currentConversationType === ConversationType.CHANNEL ? (
               <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold ml-2 text-general-dark">
                     Provide {currentConversationType.toLowerCase()} name
                  </p>
                  <Input
                     value={nameInputValue}
                     onChange={(e) => setNameInputValue(e.target.value)}
                     className="text-general-dark"
                  />
                  {renderErrors ? <p className="text-sm font-semibold ml-2 text-red-600">Name is required</p> : null}
               </div>
            ) : null}
            <UsersList
               users={users}
               currentConversationType={currentConversationType}
               userToCreateConversationWith={userToCreateConversationWith}
               usersToCreateConversationWith={usersToCreateConversationWith}
               setUserToCreateConversationWith={setUserToCreateConversationWith}
               setUsersToCreateConversationWith={setUsersToCreateConversationWith}
            />
            <DialogFooter>
               <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
               <Button onClick={onConfirm} className="bg-general-dark text-general-light">
                  Confirm
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
