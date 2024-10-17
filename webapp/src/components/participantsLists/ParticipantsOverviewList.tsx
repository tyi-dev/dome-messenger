import UserTile from '@webapp/src/components/participantsLists/UserTile.tsx';
import Spinner from '@webapp/src/components/Spinner.tsx';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area.tsx';
import UserProfileDialog from '@webapp/src/components/chat-components/dialogs/UserProfileDialog.tsx';
import { useConversationParticipants } from '@webapp/src/api/conversation-participant/hooks.ts';

export default function ParticipantsOverviewList({ conversationId }: { conversationId: number }) {
   const { data: participants } = useConversationParticipants(conversationId);

   return (
      <div className="w-full flex flex-col gap-3 font-bold">
         <p className="text-general-dark">Participants</p>
         <ScrollArea className="h-72 w-full rounded-md border p-1">
            {participants ? (
               participants.length !== 0 ? (
                  participants.map((item, index) => (
                     <UserProfileDialog
                        user={item.user}
                        key={`user-dialog-${index}`}
                        trigger={
                           <UserTile
                              user={item.user}
                              className="hover:border-general-green border border-transparent p-2 rounded-md"
                           />
                        }
                     />
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
