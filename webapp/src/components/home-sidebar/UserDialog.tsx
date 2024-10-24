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
import { LuUser } from 'react-icons/lu';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UserUpdateSchema from '@shared/src/schemas/updateProfile.ts';
import { useUpdateUser } from '@webapp/src/api/user/hooks.ts';
import { useChatContext } from '@webapp/src/components/chat-components/context.tsx';
import { toast } from '@webapp/src/hooks/use-toast.ts';

export function UserDialog() {
   const { currentUser: user } = useChatContext();
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
   const [isDialogOpen, setDialogOpen] = useState(false);
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
      setDialogOpen(false);
   }
   return (
      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(!isDialogOpen)}>
         <DialogTrigger asChild>
            <div>
               <SideBarButton title={`${user.userName}`} icon={<LuUser className="text-general-dark w-6 h-6" />} />
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
