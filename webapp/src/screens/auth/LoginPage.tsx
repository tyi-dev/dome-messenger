import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '@shared/src/schemas/login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@webapp/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@webapp/components/ui/form';
import { Input } from '@webapp/components/ui/input';

export default function LoginPage() {
   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   function onSubmit(values: z.infer<typeof LoginSchema>) {
      console.log(values);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder="Email" {...field} />
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
                        <Input placeholder="Email" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   );
}
