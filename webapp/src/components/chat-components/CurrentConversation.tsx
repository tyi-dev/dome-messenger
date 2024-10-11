import { useConversationMessages } from '@webapp/src/api/message/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import MessageComponent from '@webapp/src/components/chat-components/Message.tsx';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { format } from 'date-fns';
import DateSeparator from '@webapp/src/components/chat-components/DateSeparator.tsx';

export default function CurrentConversation() {
   const { currentConversation, userToCreateConversationWith } = useChatContext();

   const containerClassName = 'w-full h-full flex justify-center items-center text-general-dark';

   if (userToCreateConversationWith)
      return <p className={containerClassName}>Start conversation with {userToCreateConversationWith.userName}</p>;

   if (!currentConversation) return <p className={containerClassName}>Select conversation</p>;

   const { data: messages } = useConversationMessages(currentConversation.id);
   if (!messages) return <Spinner spinnerClassName="border-general-dark" />;
   if (messages.length === 0) return <p className={containerClassName}>No messages yet</p>;

   return (
      <ScrollArea className="flex flex-col h-full w-full pl-7 pr-12 pb-4 mt-1">
         <div className="flex flex-col justify-end gap-4">
            {messages?.map((item, index) => {
               if (index === 0)
                  return (
                     <>
                        <DateSeparator date={item.createdAt} key={`separator-${index}`} />
                        <MessageComponent message={item} key={`message-${index}`} />
                     </>
                  );
               if (
                  format(item.createdAt, 'dd/MM/yyyy') !==
                  format(messages[index - 1] ? messages[index - 1]?.createdAt : new Date(), 'dd/MM/yyyy')
               )
                  return (
                     <>
                        <DateSeparator date={item.createdAt} key={`separator-${index}`} />
                        <MessageComponent message={item} key={`message-${index}`} />
                     </>
                  );
               return <MessageComponent message={item} key={`message-${index}`} />;
            })}
         </div>
      </ScrollArea>
   );
}
