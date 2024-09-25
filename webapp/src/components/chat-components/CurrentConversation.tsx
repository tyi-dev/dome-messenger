import { useConversationMessages } from '@webapp/src/api/message/hooks.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import MessageComponent from '@webapp/src/components/chat-components/Message.tsx';
import { Conversation } from '@shared/types/conversation.ts';

export default function CurrentConversation(props: { conversation: Conversation | undefined }) {
   const { conversation } = props;

   if (!conversation) return <p className="w-full h-full flex justify-center items-center">Select conversation</p>;

   const { data: messages } = useConversationMessages(conversation.id);
   if (!messages) return <Spinner spinnerClassName="border-general-dark" />;
   if (messages?.length === 0) return <p className="w-full h-full flex justify-center items-center">No messages yet</p>;

   return (
      <div className="w-full h-full">
         <div className="w-full h-30">{}</div>
         <div className="flex flex-col h-full w-full px-7 justify-end pb-4 gap-4">
            {messages?.map((item, index) => <MessageComponent message={item} key={index} />)}
         </div>
      </div>
   );
}
