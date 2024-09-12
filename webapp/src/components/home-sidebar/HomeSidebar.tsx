import LogoImage from '@shared/src/images/logo.svg?react';
import { User } from '@shared/types/user';
import { UserDialog } from '@webapp/src/components/home-sidebar/UserDialog';

export default function HomeSidebar(props: { user: User }) {
   const { user } = props;

   return (
      <div className="flex flex-col w-52">
         <LogoImage className="mx-auto my-8" />
         <UserDialog user={user} />
      </div>
   );
}
