import { useSearchUsers } from '@webapp/src/api/user/hooks.ts';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area';
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
import Spinner from '@webapp/src/components/Spinner.tsx';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { SearchUserRes } from '@shared/types/user.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@webapp/src/components/ui/tabs';
import { ConversationType } from '@shared/types/conversation.ts';
import { LuCheckCircle2 } from 'react-icons/lu';
import { useCreateConversation } from '@webapp/src/api/conversation/hooks.ts';

export default function NewConversationDialog() {
   const [currentConversationType, setCurrentConversationType] = useState<ConversationType>(ConversationType.P2P);
   const { data: users } = useSearchUsers(currentConversationType);
   const [isDialogOpen, setDialogOpen] = useState(false);
   const [userToCreateConversationWith, setUserToCreateConversationWith] = useState<SearchUserRes>();
   const [usersToCreateConversationWith, setUsersToCreateConversationWith] = useState<SearchUserRes[]>([]);
   const { setUserToCreateConversation, currentUser } = useChatContext();
   const { trigger: createConversation } = useCreateConversation();

   const onConfirm = () => {
      if (currentConversationType === ConversationType.P2P && userToCreateConversationWith) {
         setUserToCreateConversation(userToCreateConversationWith);
         setDialogOpen(false);
      }
      if (
         currentConversationType === ConversationType.GROUP ||
         (currentConversationType === ConversationType.CHANNEL && usersToCreateConversationWith.length > 0)
      ) {
         createConversation({
            title: `new ${currentConversationType}`,
            participants: [...usersToCreateConversationWith, currentUser],
            conversationType: currentConversationType,
         });
         setDialogOpen(false);
      }
   };

   const onUserSelect = (user: SearchUserRes) => {
      if (currentConversationType === ConversationType.P2P) setUserToCreateConversationWith(user);
      if (currentConversationType === ConversationType.CHANNEL || currentConversationType === ConversationType.GROUP) {
         if (isUserSelected(user)) {
            setUsersToCreateConversationWith((prevState) => {
               prevState.splice(
                  prevState.findIndex((item) => item.id === user.id),
                  1,
               );
               return prevState;
            });
         } else {
            setUsersToCreateConversationWith((prevState) => [...prevState, user]);
         }
      }
   };

   const isUserSelected = (user: SearchUserRes) => {
      if (currentConversationType === ConversationType.P2P) return user.id === userToCreateConversationWith?.id;
      if (currentConversationType === ConversationType.CHANNEL || currentConversationType === ConversationType.GROUP) {
         const res = usersToCreateConversationWith.filter((item) => item.id === user.id);
         console.log(usersToCreateConversationWith);
         return !!res.length;
      }
   };

   function UsersList({ users }: { users?: SearchUserRes[] }) {
      return (
         <div className="text-general-dark mt-4">
            <ScrollArea className="h-72 w-full rounded-md border p-1">
               {users ? (
                  users.length !== 0 ? (
                     users.map((item, index) => (
                        <Button
                           key={index}
                           onClick={() => onUserSelect(item)}
                           className={`w-full flex items-center justify-center gap-3`}
                        >
                           {item?.userName}
                           {isUserSelected(item) ? <LuCheckCircle2 className="text-general-green" /> : null}
                        </Button>
                     ))
                  ) : (
                     <p className="w-full m-2 flex justify-center items-center">You sure have got a lot of friends!</p>
                  )
               ) : (
                  <Spinner spinnerClassName="border-general-dark" containerClassName="pt-10" />
               )}
            </ScrollArea>
         </div>
      );
   }

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
               <TabsContent value={ConversationType.P2P}>
                  <UsersList users={users} />
               </TabsContent>
               <TabsContent value={ConversationType.GROUP}>
                  <UsersList users={users} />
               </TabsContent>
               <TabsContent value={ConversationType.CHANNEL}>
                  <UsersList users={users} />
               </TabsContent>
            </Tabs>
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
