import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '@shared/src/schemas/login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@webapp/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/src/components/ui/form';
import { Input } from '@webapp/src/components/ui/input';
import { useLogin } from '@webapp/src/api/auth/hooks';
import LogoImage from '@shared/src/images/logo.svg?react';
import SwitchModesButton from '@webapp/src/components/SwitchModesButton';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const { trigger: triggerLogin } = useLogin();
   const navigate = useNavigate();

   const switchAuthMethod = () => {
      navigate('/signup');
   };

   function onSubmit(values: z.infer<typeof LoginSchema>) {
      triggerLogin(values);
   }

   return (
      <div className="flex flex-col items-center gap-6">
         <LogoImage />
         <div className="flex flex-row justify-around w-full">
            <p className="text-xl font-bold">Sign In</p>
            <SwitchModesButton callback={switchAuthMethod} />
         </div>
         <p className="text-xl font-bold"></p>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                  Login
               </Button>
            </form>
         </Form>
      </div>
   );
}
