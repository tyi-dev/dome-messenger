import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import AppRouter from './AppRouter';
import { useCurrentUser } from '../api/user/hooks.ts';
import AuthRouter from './AuthRouter.tsx';
import Spinner from '@webapp/src/components/Spinner.tsx';

const RootPage = () => {
   const userData = useCurrentUser();

   if (userData?.isLoading)
      return (
         <div className="w-screen h-screen">
            <Spinner />
         </div>
      );

   let NextRoutes: RouteObject[] = AuthRouter;
   if (userData?.data) {
      NextRoutes = AppRouter;
   } else if (!userData?.data) {
      NextRoutes = AuthRouter;
   }

   return <RouterProvider router={createBrowserRouter(NextRoutes)} />;
};

export default RootPage;
