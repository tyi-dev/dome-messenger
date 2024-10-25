import { DIALOG_TYPE, useDialogContext } from '@webapp/src/components/dialog/dialog-context.tsx';
import { Dialog, DialogContent, DialogHeader } from '@webapp/src/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '@webapp/src/components/ui/button.tsx';
import { LuX, LuArrowLeft } from 'react-icons/lu';
import { EditProfileDialog } from '@webapp/src/components/dialog/EditProfileDialog.tsx';
import NewConversationDialog from '@webapp/src/components/dialog/NewConversationDialog.tsx';
import UserDetailsDialog from '@webapp/src/components/dialog/UserDetailsDialog.tsx';
import ChatDetailsDialog from '@webapp/src/components/dialog/ChatDetailsDialog.tsx';

export default function UnifiedDialog() {
   const { dialogHistory, currentElement, goBack, clearDialogHistory, isDialogOpen, setDialogOpen } =
      useDialogContext();

   const returnDialogContent = () => {
      switch (currentElement?.currentRender) {
         case DIALOG_TYPE.CREATE_CONVERSATION: {
            return <NewConversationDialog />;
         }
         case DIALOG_TYPE.EDIT_PROFILE: {
            return <EditProfileDialog />;
         }
         case DIALOG_TYPE.CHAT_DETAILS: {
            return <ChatDetailsDialog />;
         }
         case DIALOG_TYPE.USER_DETAILS: {
            return <UserDetailsDialog />;
         }
         default:
            return null;
      }
   };

   return (
      <Dialog
         open={!!dialogHistory.length}
         onOpenChange={() => {
            clearDialogHistory();
            setDialogOpen(!isDialogOpen);
         }}
      >
         <DialogContent
            className="w-screen h-screen border-0 rounded-none flex flex-col lg:max-w-lg lg:h-auto lg:border-general-dark lg:border lg:rounded"
            aria-describedby={undefined}
         >
            <DialogTitle className="hidden">UserInfo</DialogTitle>
            <DialogHeader className="w-full flex flex-row justify-between items-center">
               <div className="flex flex-row items-center">
                  {dialogHistory.length > 1 ? (
                     <Button onClick={goBack} className="p-1">
                        <LuArrowLeft className="text-general-dark w-6 h-6" />
                     </Button>
                  ) : null}
                  <p className="text-general-dark pl-2 font-semibold text-lg">{currentElement?.title}</p>
               </div>
               <Button onClick={goBack} className="p-1">
                  <LuX className="text-general-dark w-6 h-6" />
               </Button>
            </DialogHeader>
            <div className="w-full flex flex-col">{returnDialogContent()}</div>
         </DialogContent>
      </Dialog>
   );
}
