import { Button } from '@webapp/src/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@webapp/src/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/src/components/ui/form';
import { Input } from '@webapp/src/components/ui/input';
import SideBarButton from './SideBarButton.tsx';
import { User } from '@shared/types/user.ts';
import { LuUser } from 'react-icons/lu';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UserUpdateSchema from '@shared/src/schemas/updateProfile.ts';
import { useUpdateUser } from '@webapp/src/api/user/hooks.ts';
import { mutate } from 'swr';
import { API_USER_URL } from '@webapp/src/api/user/actions.ts';

export function UserDialog(props: { user: User }) {
   const { user } = props;
   const form = useForm<z.infer<typeof UserUpdateSchema>>({
      resolver: zodResolver(UserUpdateSchema),
      defaultValues: {
         firstName: user.firstName,
         lastName: user.lastName,
         phoneNumber: user.phoneNumber,
         email: user.email,
      },
   });
   const { trigger: triggerUpdateUser } = useUpdateUser();
   const [isDialogOpen, setDialogOpen] = useState(false);
   function onSubmit(values: z.infer<typeof UserUpdateSchema>) {
      triggerUpdateUser(values).then(() => mutate(API_USER_URL.ME));
      setDialogOpen(false);
   }
   return (
      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(!isDialogOpen)}>
         <DialogTrigger asChild>
            <div>
               <SideBarButton
                  title={`${user.firstName} ${user.lastName}`}
                  icon={<LuUser className="text-general-light" />}
               />
            </div>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Update your profile</DialogTitle>
            </DialogHeader>
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
                     <DialogFooter>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Save changes</Button>
                     </DialogFooter>
                  </form>
               </Form>
            </div>
         </DialogContent>
      </Dialog>
   );
}