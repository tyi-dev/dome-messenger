import { Conversation } from '@shared/types/conversation';
import { Button } from '../ui/button.tsx';

export default function ConversationTile(props: {
   conversation: Conversation;
   setConversation: (conversation: Conversation) => void;
}) {
   const { conversation, setConversation } = props;

   return (
      <Button className="flex w-full flex-col" onClick={() => setConversation(conversation)}>
         <p>{conversation.title}</p>
      </Button>
   );
}
