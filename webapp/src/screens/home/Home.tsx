import { useCurrentUser } from '@webapp/src/api/user/hooks.ts';
import HomeSidebar from '@webapp/src/components/home-sidebar/HomeSidebar';
import Spinner from '@webapp/src/components/Spinner';

export default function HomePage() {
   const { data } = useCurrentUser();
   if (!data) return <Spinner />;
   return (
      <div className="flex flex-row w-full h-full">
         <HomeSidebar user={data} />
         <div className="w-full h-full bg-general-light rounded-l-3xl"></div>
      </div>
   );
}
