import { useCurrentUser } from '@webapp/src/api/user/hooks.ts';

export default function HomePage() {
   const { data } = useCurrentUser();
   return (
      <div>
         <p>{data?.firstName}</p>
         <p>{data?.lastName}</p>
         <p>{data?.phoneNumber}</p>
         <p>{data?.email}</p>
      </div>
   );
}
