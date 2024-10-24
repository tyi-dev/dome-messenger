import DynamicSideBar from '@webapp/src/components/home-sidebar/DynamicSideBar.tsx';
import StaticSideBar from '@webapp/src/components/home-sidebar/StaticSideBar.tsx';

export default function HomeSidebar() {
   return (
      <div className="relative">
         <DynamicSideBar />
         <StaticSideBar />
      </div>
   );
}
