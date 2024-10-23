import LogoImage from '@shared/src/images/logo.svg?react';
import { UserDialog } from '@webapp/src/components/home-sidebar/UserDialog';
import { useTheme } from '@webapp/src/components/theme/Theme';
import NewConversationDialog from '@webapp/src/components/home-sidebar/NewConversationDialog.tsx';

export default function HomeSidebar() {
   const { changeTheme } = useTheme();

   return (
      <div className="hidden flex-col w-40 bg-general-light border-r border-general-dark/[0.3] lg:flex">
         <LogoImage className="mx-auto my-8 text-general-dark" onClick={() => changeTheme()} />
         <div className="flex flex-col justify-between h-full w-full pb-24">
            <div className="flex flex-col">
               <NewConversationDialog />
            </div>
            <UserDialog />
         </div>
      </div>
   );
}
