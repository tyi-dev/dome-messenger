import { zodResolver } from '@hookform/resolvers/zod';
import SignupSchema from '@shared/src/schemas/signup';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@webapp/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/src/components/ui/form';
import { Input } from '@webapp/src/components/ui/input';
import { useSignUp } from '@webapp/src/api/auth/hooks';
import LogoImage from '@shared/src/images/logo.svg?react';
import SwitchModesButton from '@webapp/src/components/SwitchModesButton';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
   const form = useForm<z.infer<typeof SignupSchema>>({
      resolver: zodResolver(SignupSchema),
      defaultValues: {
         firstName: '',
         lastName: '',
         phoneNumber: '',
         email: '',
         password: '',
      },
   });

   const navigate = useNavigate();
   const { trigger: triggerSignUp } = useSignUp();

   function onSubmit(values: z.infer<typeof SignupSchema>) {
      triggerSignUp(values);
   }

   const switchAuthMethod = () => {
      navigate('/login');
   };

   return (
      <div className="flex flex-col items-center gap-6 m-auto">
         <LogoImage />
         <div className="flex flex-row justify-around w-full">
            <p className="text-xl font-bold">Sign Up</p>
            <SwitchModesButton callback={switchAuthMethod} />
         </div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
               <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                           <Input {...field} />
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                           <Input {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                           <Input {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                           <Input {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full">
                  Register
               </Button>
            </form>
         </Form>
      </div>
   );
}
