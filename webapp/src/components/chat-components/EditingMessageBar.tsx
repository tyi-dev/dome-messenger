import { LuPenLine, LuX } from 'react-icons/lu';
import { useChatContext } from '@webapp/src/components/chat-components/chat-context.tsx';

export default function EditingMessageBar() {
   const { messageToUpdate, setMessageToUpdate } = useChatContext();

   if (!messageToUpdate) return null;

   return (
      <div className="flex w-full flex-row gap-3 border-t border-general-dark/[0.2] p-2">
         <LuPenLine className="h-full w-auto p-2.5 text-general-dark" />
         <div className="flex flex-col w-full items-start">
            <p className="text-xs font-semibold text-general-dark">Editing message</p>
            <p className="truncate text-general-dark">{messageToUpdate.content}</p>
         </div>
         <LuX
            className="h-full w-auto p-2.5 cursor-pointer text-general-dark"
            onClick={() => setMessageToUpdate(null)}
         />
      </div>
   );
}
