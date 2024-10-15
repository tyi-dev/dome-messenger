import { SearchUserRes } from '@shared/types/user.ts';
import { ConversationType } from '@shared/types/conversation.ts';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area';
import { LuCheckCircle2 } from 'react-icons/lu';
import Spinner from '@webapp/src/components/Spinner.tsx';
import { Button } from '@webapp/src/components/ui/button';
import { Dispatch, SetStateAction } from 'react';

export default function UsersList({
   users,
   currentConversationType,
   userToCreateConversationWith,
   usersToCreateConversationWith,
   setUserToCreateConversationWith,
   setUsersToCreateConversationWith,
}: {
   users?: SearchUserRes[];
   currentConversationType: ConversationType;
   setUserToCreateConversationWith?: (user: SearchUserRes) => void;
   setUsersToCreateConversationWith?: Dispatch<SetStateAction<SearchUserRes[]>>;
   userToCreateConversationWith: SearchUserRes | null;
   usersToCreateConversationWith: SearchUserRes[];
}) {
   const onUserSelect = (user: SearchUserRes) => {
      if (currentConversationType === ConversationType.P2P && setUserToCreateConversationWith)
         setUserToCreateConversationWith(user);
      if (
         (currentConversationType === ConversationType.CHANNEL || currentConversationType === ConversationType.GROUP) &&
         setUsersToCreateConversationWith
      ) {
         if (isUserSelected(user)) {
            setUsersToCreateConversationWith((prevState) => {
               prevState.splice(prevState.indexOf(user), 1);
               return [...prevState];
            });
         } else {
            setUsersToCreateConversationWith((prevState) => [...prevState, user]);
         }
      }
   };

   const isUserSelected = (user: SearchUserRes) => {
      if (currentConversationType === ConversationType.P2P) return user.id === userToCreateConversationWith?.id;
      if (currentConversationType === ConversationType.CHANNEL || currentConversationType === ConversationType.GROUP) {
         return usersToCreateConversationWith.includes(user);
      }
   };

   return (
      <div className="text-general-dark mt-4">
         <ScrollArea className="h-72 w-full rounded-md border p-1">
            {users ? (
               users.length !== 0 ? (
                  users.map((item, index) => (
                     <Button
                        key={index}
                        onClick={() => onUserSelect(item)}
                        className={`w-full flex items-center justify-center gap-3 ${isUserSelected(item) ? 'hover:border-red-600' : 'hover:border-general-green'}`}
                     >
                        {item?.userName}
                        {isUserSelected(item) ? <LuCheckCircle2 className="text-general-green" /> : null}
                     </Button>
                  ))
               ) : (
                  <p className="w-full m-2 flex justify-center items-center">You sure have got a lot of friends!</p>
               )
            ) : (
               <Spinner spinnerClassName="border-general-dark" containerClassName="pt-10" />
            )}
         </ScrollArea>
      </div>
   );
}
