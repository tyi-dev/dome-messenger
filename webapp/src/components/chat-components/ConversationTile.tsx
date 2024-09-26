import { Conversation } from '@shared/types/conversation';
import { Button } from '../ui/button.tsx';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';

export default function ConversationTile(props: { conversation: Conversation }) {
   const { conversation } = props;
   const { setCurrentConversation } = useChatContext();
   return (
      <Button className="flex w-full flex-col" onClick={() => setCurrentConversation(conversation)}>
         <p>{conversation.title}</p>
      </Button>
   );
}
