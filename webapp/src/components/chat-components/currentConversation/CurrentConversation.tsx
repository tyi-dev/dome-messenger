import { useConversationMessages } from '@webapp/src/api/message/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import MessageComponent from '@webapp/src/components/chat-components/currentConversation/Message.tsx';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { format } from 'date-fns';
import DateSeparator from '@webapp/src/components/chat-components/currentConversation/DateSeparator.tsx';
import React, { useEffect } from 'react';
import { useUpdateAllUnreadStatuses } from '@webapp/src/api/message-status/hooks.ts';

export default function CurrentConversation() {
   const { currentConversation, userToCreateConversationWith, conversationBottomRef, scrollToBottom } =
      useChatContext();

   const containerClassName = 'w-full h-full flex justify-center items-center text-general-dark';

   if (userToCreateConversationWith)
      return <p className={containerClassName}>Start conversation with {userToCreateConversationWith.userName}</p>;

   if (!currentConversation) return <p className={containerClassName}>Select conversation</p>;

   const { data: messages } = useConversationMessages(currentConversation.id);
   const { trigger: updateStatuses } = useUpdateAllUnreadStatuses(currentConversation.id);

   useEffect(() => {
      if (messages) {
         updateStatuses();
         scrollToBottom();
      }
   }, [messages]);

   if (!messages) return <Spinner spinnerClassName="border-general-dark" />;
   if (messages.length === 0) return <p className={containerClassName}>No messages yet</p>;

   return (
      <ScrollArea className="flex flex-col h-full w-full pl-7 pr-12 pb-4 mt-1">
         <div className="flex flex-col justify-end gap-4">
            {messages?.map((item, index) => {
               return (
                  <React.Fragment key={`conversationElement-${index}`}>
                     {format(item.createdAt, 'dd/MM/yyyy') !==
                        format(messages[index - 1] ? messages[index - 1]?.createdAt : new Date(), 'dd/MM/yyyy') ||
                     index === 0 ? (
                        <DateSeparator date={item.createdAt} />
                     ) : null}
                     <MessageComponent message={item} />
                  </React.Fragment>
               );
            })}
            <div ref={conversationBottomRef} />
         </div>
      </ScrollArea>
   );
}
