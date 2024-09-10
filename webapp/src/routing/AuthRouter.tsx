import { createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';
import SignUpPage from '../screens/auth/SignUpPage.tsx';
import LoginPage from '../screens/auth/LoginPage.tsx';

const AuthRouter = createRoutesFromElements(
   <Route path="/" element={<Outlet />}>
      <Route index element={<Navigate to="/login" replace={true} />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
   </Route>,
);

export default AuthRouter;
