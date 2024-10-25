import returnLastSeen from '@shared/src/utils/lastSeen.ts';
import UserAvatar from '@webapp/src/components/UserAvatar.tsx';
import { useDialogContext } from '@webapp/src/components/dialog/dialog-context.tsx';

export default function UserDetailsDialog() {
   const { currentElement, goBack } = useDialogContext();

   if (!currentElement?.data) {
      goBack();
      return null;
   }

   const { data: user } = currentElement;

   return (
      <div className="w-full flex flex-col">
         <div className="w-full flex flex-row items-center gap-3">
            <UserAvatar
               firstWord={user?.firstName ? user.firstName : 'Name'}
               secondWord={user?.lastName}
               className="h-12 w-12"
            />
            <div className="w-full flex flex-col gap-2">
               <div className="w-full flex flex-row gap-3 items-center">
                  <p className="text-general-dark font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
                  <p className="text-general-dark/[0.5] text-sm">{user?.userName}</p>
               </div>
               <p className="text-general-dark/[0.7]">{returnLastSeen(user)}</p>
            </div>
         </div>
      </div>
   );
}
