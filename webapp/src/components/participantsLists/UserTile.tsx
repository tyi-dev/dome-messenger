import { SearchUserRes, User } from '@shared/types/user.ts';
import { twMerge } from 'tailwind-merge';
import UserAvatar from '@webapp/src/components/UserAvatar.tsx';

export default function UserTile({ user, className }: { user: User | SearchUserRes; className?: string }) {
   return (
      <div className={twMerge('w-full flex flex-row items-center justify-center gap-3', className)}>
         <UserAvatar firstWord={user.firstName} secondWord={user.lastName} className="font-normal p-1 text-sm m-0" />
         <div className="flex flex-row gap-3">
            <p className="text-general-dark font-semibold">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-general-dark/[0.5] font-semibold text-sm">{`${user.userName}`}</p>
         </div>
      </div>
   );
}
