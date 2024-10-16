import { SearchUserRes } from '@shared/types/user.ts';
import { ConversationType } from '@shared/types/conversation.ts';
import { ScrollArea } from '@webapp/src/components/ui/scroll-area';
import { LuCheckCircle2 } from 'react-icons/lu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/src/components/ui/form.tsx';
import { Input } from '@webapp/src/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
   ConversationOperationsSchema,
   ConversationSchemaResultType,
} from '@shared/src/schemas/conversationOperations.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@webapp/src/components/Spinner.tsx';
import { Button } from '@webapp/src/components/ui/button';
import { useState } from 'react';

export default function UsersList({
   users,
   conversationType,
   onSubmit,
   defaultValuesArg,
   onCancel,
}: {
   users?: SearchUserRes[];
   conversationType: ConversationType;
   onSubmit: (data: ConversationSchemaResultType) => void;
   /**
    * {
    *    title: '',
    *    participants: [],
    *  }
    * */
   defaultValuesArg?: ConversationSchemaResultType;
   onCancel?: () => void;
}) {
   const conversationSchema = ConversationOperationsSchema(conversationType);

   const form = useForm<z.infer<typeof conversationSchema>>({
      resolver: zodResolver(conversationSchema),
      defaultValues: defaultValuesArg
         ? defaultValuesArg
         : {
              title: '',
              participants: [],
           },
   });

   const [selectedParticipants, setSelectedParticipants] = useState<SearchUserRes[]>(form.getValues('participants'));

   const onUserSelect = (user: SearchUserRes) => {
      if (conversationType === ConversationType.P2P) {
         form.setValue('participants', [user]);
         setSelectedParticipants([user]);
      }
      if (conversationType === ConversationType.CHANNEL || conversationType === ConversationType.GROUP) {
         if (isUserSelected(user)) {
            const data = selectedParticipants;
            data.splice(data.indexOf(user), 1);
            form.setValue('participants', [...data]);
            setSelectedParticipants([...data]);
         } else {
            form.setValue('participants', [...form.getValues('participants'), user]);
            setSelectedParticipants((prevState) => [...prevState, user]);
         }
      }
   };

   const isUserSelected = (user: SearchUserRes) => {
      return selectedParticipants.includes(user);
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit((data) => onSubmit({ title: data.title, participants: selectedParticipants }))}
            className="flex flex-col gap-5 w-full"
         >
            {conversationType !== ConversationType.P2P ? (
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem className="mb-4">
                        <FormLabel className="text-sm font-semibold ml-2 text-general-dark">
                           Provide {conversationType.toLowerCase()} name
                        </FormLabel>
                        <FormControl>
                           <Input {...field} className="text-general-dark" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            ) : null}
            <ScrollArea className="h-72 w-full rounded-md border p-1">
               {users ? (
                  users.length !== 0 ? (
                     users.map((item, index) => (
                        <Button
                           type="button"
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
            <div className="flex flex-row justify-end gap-1">
               <Button type="button" onClick={onCancel}>
                  Cancel
               </Button>
               <Button type="submit" className="bg-general-dark text-general-light">
                  Confirm
               </Button>
            </div>
         </form>
      </Form>
   );
}
