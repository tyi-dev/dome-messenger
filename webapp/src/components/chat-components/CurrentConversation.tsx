import { useConversationMessages } from '@webapp/src/api/message/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import MessageComponent from '@webapp/src/components/chat-components/Message.tsx';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';

export default function CurrentConversation() {
   const { currentConversation, userToCreateConversationWith } = useChatContext();

   const containerClassName = 'w-full h-full flex justify-center items-center';

   if (userToCreateConversationWith)
      return <p className={containerClassName}>Start conversation with {userToCreateConversationWith.userName}</p>;

   if (!currentConversation) return <p className={containerClassName}>Select conversation</p>;

   const { data: messages } = useConversationMessages(currentConversation.id);
   console.log(messages);
   if (!messages) return <Spinner spinnerClassName="border-general-dark" />;
   if (messages.length === 0) return <p className={containerClassName}>No messages yet</p>;

   return (
      <ScrollArea className="flex flex-col h-full w-full pl-7 pr-12 pb-4 ">
         <div className="flex flex-col justify-end gap-4">
            {messages?.map((item, index) => <MessageComponent message={item} key={index} />)}
         </div>
      </ScrollArea>
   );
}
