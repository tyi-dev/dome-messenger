import { createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from '../screens/home/Home.tsx';
import ErrorBoundary from '@/screens/ErrorBoundary.tsx';

const AppRouter = createRoutesFromElements(
   <Route path="/" errorElement={<ErrorBoundary />}>
      <Route index element={<HomePage />} />
   </Route>,
);

export default AppRouter;
