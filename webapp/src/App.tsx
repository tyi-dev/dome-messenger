import './App.css';
import { ThemeProvider } from './components/theme/Theme';
import RootPage from '@webapp/src/routing/Router';

export default function App() {
   return (
      <ThemeProvider>
         <RootPage />
      </ThemeProvider>
   );
}
