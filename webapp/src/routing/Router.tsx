import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import AppRouter from './AppRouter';
import { useCurrentUser } from '../api/user/hooks.ts';
import AuthRouter from './AuthRouter.tsx';
import Spinner from '@webapp/src/components/Spinner.tsx';

const RootPage = () => {
   const { data: userData, isLoading: isUserDataLoading } = useCurrentUser();

   if (isUserDataLoading)
      return (
         <div className="w-screen h-screen">
            <Spinner />
         </div>
      );

   let NextRoutes: RouteObject[] = AuthRouter;
   if (userData) {
      NextRoutes = AppRouter;
   } else if (!userData) {
      NextRoutes = AuthRouter;
   }

   return <RouterProvider router={createBrowserRouter(NextRoutes)} />;
};

export default RootPage;
