import { createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import SignUpPage from '@webapp/src/screens/auth/SignUpPage.tsx';
import LoginPage from '@webapp/src/screens/auth/LoginPage.tsx';
import ErrorBoundary from '@webapp/src/screens/ErrorBoundary.tsx';
import { RootLayout } from './RootLayout';

const AuthRouter = createRoutesFromElements(
   <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Navigate to="/login" replace={true} />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
   </Route>,
);

export default AuthRouter;
