import { useCurrentUser } from '@webapp/src/api/user/hooks.ts';
import HomeSidebar from '@webapp/src/components/home-sidebar/HomeSidebar';
import Spinner from '@webapp/src/components/Spinner';

export default function HomePage() {
   const { data } = useCurrentUser();
   if (!data) return <Spinner />;
   return (
      <div>
         <HomeSidebar user={data} />
      </div>
   );
}
