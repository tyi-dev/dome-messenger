import { Button } from '@webapp/src/components/ui/button.tsx';
import LogoImage from '@shared/src/images/logo.svg?react';
import { useSidebar } from '@webapp/src/components/ui/sidebar.tsx';

export default function ConversationsHeader() {
   const { toggleSidebar } = useSidebar();

   return (
      <div className="w-full flex justify-start items-center p-1">
         <Button
            onClick={toggleSidebar}
            className="border border-transparent bg-general-gray/[0.5] p-1 hover:border-none"
         >
            <LogoImage className="text-general-dark w-12 h-12" />
         </Button>
      </div>
   );
}
