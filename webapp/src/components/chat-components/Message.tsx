import { Message } from '@shared/types/message';
import { useUserById } from '@webapp/src/api/user/hooks.ts';
import { User } from '@shared/types/user.ts';

export default function MessageComponent(props: { message: Message; currentUser: User }) {
   const { message } = props;
   const { data: user } = useUserById(message.senderId);
   return (
      <div className="flex flex-col justify-start max-w-96">
         <div className="flex justify-start">{user?.userName}</div>
         <div className="flex justify-start">{message.content}</div>
      </div>
   );
}
