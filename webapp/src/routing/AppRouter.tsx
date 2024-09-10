import { createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from '../screens/home/Home.tsx';

const AppRouter = createRoutesFromElements(
   <Route path="/">
      <Route index element={<HomePage />} />
   </Route>,
);

export default AppRouter;
