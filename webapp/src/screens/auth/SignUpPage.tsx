import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@shared/src/schemas/signup.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@webapp/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/src/components/ui/form';
import { Input } from '@webapp/src/components/ui/input';
import { useSignUp } from '@webapp/src/api/auth/hooks';
import LogoImage from '@shared/src/images/logo.svg?react';
import SwitchModesButton from '@webapp/src/components/SwitchModesButton';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@webapp/src/components/theme/Theme';

export default function SignUpPage() {
   const form = useForm<z.infer<typeof SignupSchema>>({
      resolver: zodResolver(SignupSchema),
      defaultValues: {
         firstName: '',
         lastName: '',
         userName: '',
         phoneNumber: '',
         email: '',
         password: '',
      },
   });

   const navigate = useNavigate();
   const { trigger: triggerSignUp } = useSignUp();
   const { changeTheme } = useTheme();

   function onSubmit(values: z.infer<typeof SignupSchema>) {
      triggerSignUp(values);
   }

   const switchAuthMethod = () => {
      navigate('/login');
   };

   return (
      <div className="flex flex-col items-center gap-6 m-auto w-72">
         <LogoImage className="text-general-dark" onClick={() => changeTheme()} />
         <div className="flex flex-row justify-around w-44">
            <p className="text-xl font-bold text-general-dark">Sign Up</p>
            <SwitchModesButton callback={switchAuthMethod} />
         </div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
               <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel invertcolor>First Name</FormLabel>
                        <FormControl>
                           <Input invertcolor {...field} />
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
                           <Input invertcolor {...field} />
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
                           <Input invertcolor {...field} />
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
                           <Input invertcolor {...field} />
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
                           <Input invertcolor {...field} />
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
                        <FormLabel invertcolor>Password</FormLabel>
                        <FormControl>
                           <Input invertcolor {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full text-general-light bg-general-dark">
                  Register
               </Button>
            </form>
         </Form>
      </div>
   );
}
