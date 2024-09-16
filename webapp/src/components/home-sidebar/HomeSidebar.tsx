import LogoImage from '@shared/src/images/logo.svg?react';
import { User } from '@shared/types/user';
import { UserDialog } from '@webapp/src/components/home-sidebar/UserDialog';
import { useTheme } from '@webapp/src/components/theme/Theme';

export default function HomeSidebar(props: { user: User }) {
   const { user } = props;
   const { changeTheme } = useTheme();

   return (
      <div className="flex flex-col w-32">
         <LogoImage className="mx-auto my-8 text-general-light" onClick={() => changeTheme()} />
         <div className="flex flex-col justify-between h-full w-full pb-24">
            <div className="flex flex-col"></div>
            <UserDialog user={user} />
         </div>
      </div>
   );
}
