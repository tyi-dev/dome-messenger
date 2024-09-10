import { Outlet } from 'react-router-dom';

export function RootLayout() {
   return (
      <div className="w-full h-screen flex flex-col bg-background-primary pt-3">
         <Outlet />
      </div>
   );
}
