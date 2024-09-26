import { Message } from '@shared/types/message';
import { useUserById } from '@webapp/src/api/user/hooks.ts';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';

export default function MessageComponent({ message }: { message: Message }) {
   const { currentUser } = useChatContext();
   const { data: user } = useUserById(message.senderId);

   const isMessageMine = () => {
      return user?.id === currentUser.id;
   };

   return (
      <div
         className={`flex flex-col ${isMessageMine() ? 'ml-auto border-general-orange' : 'mr-auto border-general-blue'} border-2 py-2 px-4 rounded-xl max-w-96`}
      >
         <div className={`flex ${isMessageMine() ? 'ml-auto' : 'mr-auto'} text-general-dark`}>{user?.userName}</div>
         <div className={`flex ${isMessageMine() ? 'ml-auto' : 'mr-auto'} text-general-dark`}>{message.content}</div>
      </div>
   );
}
