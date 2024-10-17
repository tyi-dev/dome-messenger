import { SearchUserRes, User } from '@shared/types/user.ts';
import { twMerge } from 'tailwind-merge';

export default function UserTile({ user, className }: { user: User | SearchUserRes; className?: string }) {
   return (
      <div className={twMerge('w-full flex flex-row items-center justify-around', className)}>
         {/*INSERT AVATAR*/}
         <div className="flex flex-row gap-3">
            <p className="text-general-dark font-semibold">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-general-dark/[0.5] font-semibold text-sm">{`${user.userName}`}</p>
         </div>
      </div>
   );
}
