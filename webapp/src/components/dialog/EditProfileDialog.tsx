import { Button } from '@webapp/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/src/components/ui/form';
import { Input } from '@webapp/src/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UserUpdateSchema from '@shared/src/schemas/updateProfile.ts';
import { useUpdateUser } from '@webapp/src/api/user/hooks.ts';
import { useChatContext } from '@webapp/src/components/chat-components/chat-context.tsx';
import { toast } from '@webapp/src/hooks/use-toast.ts';
import { useDialogContext } from '@webapp/src/components/dialog/dialog-context.tsx';
import { mutate } from 'swr';
import { API_USER_URL } from '@webapp/src/api/user/actions.ts';

export function EditProfileDialog() {
   const { currentUser: user } = useChatContext();
   const { goBack } = useDialogContext();

   const form = useForm<z.infer<typeof UserUpdateSchema>>({
      resolver: zodResolver(UserUpdateSchema),
      defaultValues: {
         firstName: user.firstName,
         lastName: user.lastName,
         userName: user.userName,
         phoneNumber: user.phoneNumber,
         email: user.email,
      },
   });
   const { trigger: triggerUpdateUser } = useUpdateUser();
   function onSubmit(values: z.infer<typeof UserUpdateSchema>) {
      triggerUpdateUser(values).then(() => {
         if (
            user.userName !== values.userName ||
            user.phoneNumber !== values.phoneNumber ||
            user.email !== values.email
         ) {
            toast({
               variant: 'destructive',
               title: 'You`ve just updated essential information, you might need to re-login',
            });
         }
      });
      mutate(API_USER_URL.ME);
      goBack();
   }
   return (
      <div className="text-general-dark mt-4">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
               <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel invertcolor>First Name</FormLabel>
                        <FormControl>
                           <Input {...field} invertcolor />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel invertcolor>Last Name</FormLabel>
                        <FormControl>
                           <Input {...field} invertcolor />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel invertcolor>UserName</FormLabel>
                        <FormControl>
                           <Input {...field} invertcolor />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel invertcolor>Phone Number</FormLabel>
                        <FormControl>
                           <Input {...field} invertcolor />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel invertcolor>Email</FormLabel>
                        <FormControl>
                           <Input {...field} invertcolor />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex pt-2 items-center justify-end gap-2">
                  <Button onClick={goBack}>Cancel</Button>
                  <Button type="submit" className="text-general-light bg-general-dark">
                     Save changes
                  </Button>
               </div>
            </form>
         </Form>
      </div>
   );
}
