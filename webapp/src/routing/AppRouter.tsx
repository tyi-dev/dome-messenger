import { createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from '../screens/home/Home.tsx';
import ErrorBoundary from '@webapp/src/screens/ErrorBoundary.tsx';
import { RootLayout } from './RootLayout.tsx';

const AppRouter = createRoutesFromElements(
   <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route index element={<HomePage />} />
   </Route>,
);

export default AppRouter;
