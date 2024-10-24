import { Input } from '@webapp/src/components/ui/input';
import { LuMenu } from 'react-icons/lu';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';

export default function ConversationListHeader() {
   const { isSidebarOpen, setSidebarOpen } = useChatContext();

   return (
      <div className="flex flex-row gap-1 justify-start items-center w-full px-2 py-3 border-b border-general-dark/[0.2] mb-2 lg:mb-0 lg:border-b-0">
         <LuMenu
            className="flex lg:hidden mx-2 w-12 h-12 text-general-dark p-2 cursor-pointer hover:bg-general-gray hover:text-black rounded"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
         />
         <Input invertcolor placeholder="Search conversaton..." className="w-full border-general-blue/[0.7]" />
      </div>
   );
}
