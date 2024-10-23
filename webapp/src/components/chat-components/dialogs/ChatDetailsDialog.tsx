import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@webapp/src/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { LuX } from 'react-icons/lu';
import { Button } from '@webapp/src/components/ui/button.tsx';
import { Conversation } from '@shared/types/conversation.ts';
import Spinner from '@webapp/src/components/Spinner.tsx';
import { ConversationParticipant } from '@shared/types/conversation-participant.ts';
import ParticipantsOverviewList from '@webapp/src/components/participantsLists/ParticipantsOverviewList.tsx';
import { capitalize } from '@shared/src/utils/capitalize.ts';
import UserAvatar from '@webapp/src/components/UserAvatar.tsx';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function ChatDetailsDialog({
   conversation,
   trigger,
   participants,
}: {
   participants: ConversationParticipant[];
   conversation: Conversation;
   trigger: ReactNode;
}) {
   const [isDialogOpen, setDialogOpen] = useState(false);

   return (
      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(!isDialogOpen)}>
         <DialogTrigger asChild>
            <div className="border-none bg-transparent w-full cursor-pointer">{trigger}</div>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
            <DialogTitle className="hidden">UserInfo</DialogTitle>
            {participants ? (
               <>
                  <DialogHeader className="w-full flex flex-row justify-between items-center space-y-0">
                     <p className="text-general-dark font-semibold">{`${capitalize(conversation.conversationType)} info`}</p>
                     <Button onClick={() => setDialogOpen(false)} className="p-1">
                        <LuX className="text-general-dark w-6 h-6" />
                     </Button>
                  </DialogHeader>
                  <div className="w-full flex flex-col">
                     <div className="w-full flex flex-row items-center gap-4">
                        <UserAvatar firstWord={conversation.title} className="h-12 w-12" />
                        <div className="w-full flex flex-col gap-2">
                           <p className="text-general-dark font-semibold">{`${conversation?.title}`}</p>
                           <p className="text-general-dark/[0.7]">{`${participants.length} members`}</p>
                        </div>
                     </div>
                  </div>
                  <ParticipantsOverviewList conversationId={conversation?.id} />
               </>
            ) : (
               <Spinner />
            )}
         </DialogContent>
      </Dialog>
   );
}
