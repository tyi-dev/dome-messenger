import { createContext, useContext } from 'react';
//import { User } from '@shared/types/user.ts';
import { Nullable } from '@shared/types/nullable.ts';
//import { Conversation } from '@shared/types/conversation.ts';

//type DialogDataType = Nullable<User | Conversation>;

export enum DIALOG_TYPE {
   EDIT_PROFILE = 'EDIT_PROFILE',
   CREATE_CONVERSATION = 'CREATE_CONVERSATION',
   USER_DETAILS = 'USER_DETAILS',
   CHAT_DETAILS = 'GROUP_DETAILS',
}

export type TDialogHistory = {
   title?: string;
   currentRender: DIALOG_TYPE;
   data?: any;
   //data?: DialogDataType;
};

export type TDialogContext = {
   isDialogOpen: boolean;
   dialogHistory: TDialogHistory[];
   currentElement: Nullable<TDialogHistory>;
   addToDialogHistory: (newElement: TDialogHistory) => void;
   clearDialogHistory: () => void;
   setDialogOpen: (newState: boolean) => void;
   goBack: () => void;
};

export const DialogContext = createContext<TDialogContext>({
   isDialogOpen: false,
   dialogHistory: [],
   currentElement: null,
   addToDialogHistory: () => {},
   clearDialogHistory: () => {},
   setDialogOpen: () => {},
   goBack: () => {},
});

export const useDialogContext = (): TDialogContext => useContext(DialogContext);
