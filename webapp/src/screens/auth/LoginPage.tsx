import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '@shared/src/schemas/login.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@webapp/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/src/components/ui/form';
import { Input } from '@webapp/src/components/ui/input';
import LogoImage from '@shared/src/images/logo.svg?react';
import SwitchModesButton from '@webapp/src/components/SwitchModesButton';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@webapp/src/api/auth/hooks';
import { useTheme } from '@webapp/src/components/theme/Theme';

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
   const { changeTheme } = useTheme();

   const switchAuthMethod = () => {
      navigate('/signup');
   };

   function onSubmit(values: z.infer<typeof LoginSchema>) {
      triggerLogin(values);
   }

   return (
      <div className="flex flex-col items-center gap-6 m-auto w-72">
         <LogoImage className="text-general-light" onClick={() => changeTheme()} />
         <div className="flex flex-row justify-around w-44">
            <p className="text-xl font-bold text-general-light">Sign In</p>
            <SwitchModesButton callback={switchAuthMethod} />
         </div>
         <p className="text-xl font-bold"></p>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
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
