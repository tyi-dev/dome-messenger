import { User } from '@shared/types/user.ts';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@webapp/src/components/ui/dialog';
import { ReactNode, useState } from 'react';
import returnLastSeen from '@shared/src/utils/lastSeen.ts';
import { LuX } from 'react-icons/lu';
import { Button } from '@webapp/src/components/ui/button.tsx';

export default function UserProfileDialog({ user, trigger }: { user: User; trigger: ReactNode }) {
   const [isDialogOpen, setDialogOpen] = useState(false);

   return (
      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(!isDialogOpen)}>
         <DialogTrigger asChild>
            <div className="border-none bg-transparent w-full cursor-pointer">{trigger}</div>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="w-full flex flex-row justify-between items-center space-y-0">
               <p className="text-general-dark font-semibold">User info</p>
               <Button onClick={() => setDialogOpen(false)} className="p-1">
                  <LuX className="text-general-dark w-6 h-6" />
               </Button>
            </DialogHeader>
            <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
                  {/*INSERT AVATAR*/}
                  <div className="w-full flex flex-col gap-2">
                     <div className="w-full flex flex-row gap-3 items-center">
                        <p className="text-general-dark font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
                        <p className="text-general-dark/[0.5] text-sm">{user?.userName}</p>
                     </div>
                     <p className="text-general-dark/[0.7]">{returnLastSeen(user)}</p>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
