import { Outlet } from 'react-router-dom';
import { useTheme } from '@webapp/src/components/theme/Theme';
import { Toaster } from '@webapp/src/components/ui/toaster.tsx';

export function RootLayout() {
   useTheme();
   return (
      <div className="w-screen h-screen flex flex-col bg-background-primary bg-general-dark">
         <Outlet />
         <Toaster />
      </div>
   );
}
