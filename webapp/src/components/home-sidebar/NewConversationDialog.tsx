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
import { User } from '@shared/types/user.ts';

export default function NewConversationDialog() {
   const { data: users } = useSearchUsers();
   const [isDialogOpen, setDialogOpen] = useState(false);
   const { setUserToCreateConversation } = useChatContext();

   const onUserSelect = (user: Pick<User, 'id' | 'userName'>) => {
      setUserToCreateConversation(user);
      setDialogOpen(false);
   };

   return (
      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(!isDialogOpen)}>
         <DialogTrigger asChild>
            <div>
               <SideBarButton title={`Create conversation`} icon={<LuPlus className="text-general-light" />} />
            </div>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Select user to start conversation with</DialogTitle>
            </DialogHeader>
            <div className="text-general-dark mt-4">
               <ScrollArea className="h-72 w-full rounded-md border">
                  {users ? (
                     users.map((item, index) => {
                        return (
                           <Button key={index} onClick={() => onUserSelect(item)} className="w-full">
                              {item?.userName}
                           </Button>
                        );
                     })
                  ) : (
                     <Spinner spinnerClassName="border-general-dark" containerClassName="pt-10" />
                  )}
               </ScrollArea>
            </div>
            <DialogFooter>
               <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
