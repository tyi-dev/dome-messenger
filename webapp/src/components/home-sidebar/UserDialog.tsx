import { Button } from '@webapp/src/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@webapp/src/components/ui/dialog';
import SideBarButton from './SideBarButton.tsx';
import { User } from '@shared/types/user.ts';
import { LuUser } from 'react-icons/lu';

export function UserDialog(props: { user: User }) {
   const { user } = props;
   return (
      <Dialog>
         <DialogTrigger asChild>
            <div>
               <SideBarButton title={`${user.firstName} ${user.lastName}`} icon={<LuUser />} />
            </div>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Your profile</DialogTitle>
            </DialogHeader>
            <div>
               <p>{user.firstName}</p>
               <p>{user.lastName}</p>
               <p>{user.phoneNumber}</p>
               <p>{user.email}</p>
            </div>
            <DialogFooter>
               <Button type="submit">Save changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
