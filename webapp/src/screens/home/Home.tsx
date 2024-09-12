import { useCurrentUser } from '@webapp/src/api/user/hooks.ts';
import HomeSidebar from '../../components/HomeHeader.tsx';
import Spinner from '@webapp/src/components/Spinner.tsx';

export default function HomePage() {
   const { data } = useCurrentUser();
   if (!data) return <Spinner />;
   return (
      <div>
         <HomeSidebar user={data} />
      </div>
   );
}
