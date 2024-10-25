import UserTile from '@webapp/src/components/participantsLists/UserTile.tsx';
import Spinner from '@webapp/src/components/Spinner.tsx';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area.tsx';
import { useConversationParticipants } from '@webapp/src/api/conversation-participant/hooks.ts';
import { DIALOG_TYPE, useDialogContext } from '@webapp/src/components/dialog/dialog-context.tsx';

export default function ParticipantsOverviewList({ conversationId }: { conversationId: number }) {
   const { data: participants } = useConversationParticipants(conversationId);
   const { addToDialogHistory } = useDialogContext();

   return (
      <div className="w-full flex flex-col gap-3 font-bold">
         <p className="text-general-dark">Participants</p>
         <ScrollArea className="h-72 w-full rounded-md border p-1">
            {participants ? (
               participants.length !== 0 ? (
                  participants.map((item, index) => (
                     <UserTile
                        user={item.user}
                        className="hover:border-general-green border border-transparent p-2 rounded-md"
                        key={`participant-tile-${index}`}
                        onClick={() =>
                           addToDialogHistory({
                              currentRender: DIALOG_TYPE.USER_DETAILS,
                              title: 'User info',
                              data: item.user,
                           })
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
