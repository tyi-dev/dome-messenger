import { Message } from '@shared/types/message';
import { useUserById } from '@webapp/src/api/user/hooks.ts';
import { User } from '@shared/types/user.ts';

export default function MessageComponent(props: { message: Message; currentUser: User }) {
   const { message, currentUser } = props;
   const { data: user } = useUserById(message.senderId);
   return (
      <div className={`flex flex-col ${user?.id === currentUser.id ? 'ml-auto' : 'mr-auto'} max-w-96`}>
         <div className={`flex ${user?.id === currentUser.id ? 'ml-auto' : 'mr-auto'} text-general-dark`}>
            {user?.userName}
         </div>
         <div className={`flex ${user?.id === currentUser.id ? 'ml-auto' : 'mr-auto'} text-general-dark`}>
            {message.content}
         </div>
      </div>
   );
}
