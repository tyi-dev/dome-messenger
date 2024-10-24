import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { useRef } from 'react';
import { UserDialog } from '@webapp/src/components/home-sidebar/UserDialog.tsx';
import NewConversationDialog from '@webapp/src/components/home-sidebar/NewConversationDialog.tsx';
import UserAvatar from '@webapp/src/components/UserAvatar.tsx';

export default function DynamicSideBar() {
   const { isSidebarOpen, setSidebarOpen, currentUser } = useChatContext();

   const sidebarRef = useRef<HTMLDivElement>(null);

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
            {isSidebarOpen ? (
               <div className="flex flex-col h-full">
                  <div className="w-full flex flex-col p-3">
                     <div className="w-full flex flex-row items-center gap-3">
                        <UserAvatar
                           firstWord={currentUser.firstName}
                           secondWord={currentUser.lastName}
                           className="h-12 w-12"
                        />
                        <div className="w-full flex flex-col gap-2">
                           <div className="w-full flex flex-row gap-3 items-center">
                              <p className="text-general-dark font-semibold">{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
                              <p className="text-general-dark/[0.5] text-sm">{currentUser?.userName}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <NewConversationDialog />
                  <UserDialog />
               </div>
            ) : null}
         </div>
      </>
   );
}
