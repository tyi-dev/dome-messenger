import { Outlet } from 'react-router-dom';

export function RootLayout() {
   return (
      <div className="w-screen h-screen flex flex-col bg-background-primary">
         <Outlet />
      </div>
   );
}
