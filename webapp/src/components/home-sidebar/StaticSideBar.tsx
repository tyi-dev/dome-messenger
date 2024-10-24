import LogoImage from '@shared/src/images/logo.svg?react';
import { LuMenu } from 'react-icons/lu';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { useTheme } from '@webapp/src/components/theme/Theme.tsx';

export default function StaticSideBar() {
   const { isSidebarOpen, setSidebarOpen } = useChatContext();
   const { changeTheme } = useTheme();

   return (
      <div className="hidden h-full flex-col bg-general-light border-r border-general-dark/[0.3] lg:flex">
         <LuMenu
            className="mx-auto mt-4 w-12 h-12 text-general-dark p-2 cursor-pointer hover:bg-general-gray hover:text-black rounded transition-colors"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
         />
         <LogoImage className="m-4 w-16 h-16 text-general-dark" onClick={() => changeTheme()} />
      </div>
   );
}
