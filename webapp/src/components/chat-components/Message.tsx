import { Message } from '@shared/types/message';
import { useUserById } from '@webapp/src/api/user/hooks.ts';
import { User } from '@shared/types/user.ts';

export default function MessageComponent(props: { message: Message; currentUser: User }) {
   const { message, currentUser } = props;
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
