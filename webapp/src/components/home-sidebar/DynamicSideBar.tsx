import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { useEffect, useRef } from 'react';
import { UserDialog } from '@webapp/src/components/home-sidebar/UserDialog.tsx';
import NewConversationDialog from '@webapp/src/components/home-sidebar/NewConversationDialog.tsx';

export default function DynamicSideBar() {
   const { isSidebarOpen, setSidebarOpen } = useChatContext();

   const sidebarRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
         }
      };

      if (isSidebarOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isSidebarOpen, setSidebarOpen]);

   return (
      <>
         {isSidebarOpen && (
            <div
               className={`fixed inset-0 bg-general-dark/[0.3] transition-opacity duration-300 ease-in-out z-40 
                        ${isSidebarOpen ? 'opacity-50 visible' : 'opacity-0 invisible'}`}
               onClick={() => setSidebarOpen(false)}
            ></div>
         )}
         <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full bg-general-light text-general-dark z-50 transition-all duration-300 ease-in-out 
                        ${isSidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}
         >
            <div className="flex flex-col h-full ">
               <NewConversationDialog />
               <UserDialog />
            </div>
         </div>
      </>
   );
}
