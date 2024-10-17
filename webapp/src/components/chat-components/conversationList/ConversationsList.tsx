import { useMyConversations } from '@webapp/src/api/conversation/hooks.ts';
import ConversationTile from '@webapp/src/components/chat-components/conversationList/ConversationTile';
import Spinner from '@webapp/src/components/Spinner.tsx';
import { twMerge } from 'tailwind-merge';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area';

export default function ConversationsList() {
   const containerClassName = 'w-52 h-full border-r border-general-dark/[0.2]';
   const { data: conversations } = useMyConversations();
   if (!conversations)
      return <Spinner spinnerClassName="border-general-dark" containerClassName={containerClassName} />;
   if (conversations?.length === 0)
      return <p className={twMerge('flex justify-center items-center', containerClassName)}>No conversation yet</p>;

   return (
      <ScrollArea className={twMerge('flex flex-col', containerClassName)}>
         {conversations?.map((item, index) => <ConversationTile key={index} conversation={item} />)}
      </ScrollArea>
   );
}
