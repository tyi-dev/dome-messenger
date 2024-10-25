import Spinner from '@webapp/src/components/Spinner.tsx';
import ParticipantsOverviewList from '@webapp/src/components/participantsLists/ParticipantsOverviewList.tsx';
import UserAvatar from '@webapp/src/components/UserAvatar.tsx';
import { useDialogContext } from '@webapp/src/components/dialog/dialog-context.tsx';

export default function ChatDetailsDialog() {
   const { currentElement, goBack } = useDialogContext();

   if (!currentElement?.data?.participants) {
      goBack();
      return null;
   }

   const { data } = currentElement;
   const { participants, conversation } = data;

   return (
      <div className="flex flex-col gap-5">
         {participants ? (
            <>
               <div className="w-full flex flex-col">
                  <div className="w-full flex flex-row items-center gap-4">
                     <UserAvatar firstWord={conversation?.title ? conversation.title : 'Name'} className="h-12 w-12" />
                     <div className="w-full flex flex-col gap-2">
                        <p className="text-general-dark font-semibold">{`${conversation?.title}`}</p>
                        <p className="text-general-dark/[0.7]">{`${participants?.length} members`}</p>
                     </div>
                  </div>
               </div>
               <ParticipantsOverviewList conversationId={conversation?.id} />
            </>
         ) : (
            <Spinner />
         )}
      </div>
   );
}
