import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export enum Theme {
   DARK = 'dark',
   LIGHT = 'light',
}

type ThemeContextType = {
   theme: Theme;
   init: () => void;
   changeTheme: (theme?: Theme) => void;
};

const STORAGE_KEY = 'theme';
const defaultTheme = Theme.DARK;

const applyTheme = (theme: Theme): void => {
   document.documentElement.setAttribute('data-theme', theme);
   localStorage.setItem(STORAGE_KEY, theme);
};

function init() {
   return (localStorage.getItem(STORAGE_KEY) as Theme) || defaultTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
   const [theme, setThemeState] = useState(init());

   useEffect(() => {
      applyTheme(theme);
   }, [theme]);

   function toggleTheme() {
      const nextTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
      setThemeState(nextTheme);
   }

   function changeTheme(theme?: Theme) {
      if (!theme) {
         toggleTheme();
         return;
      }

      setThemeState(theme);
   }

   return <ThemeContext.Provider value={{ theme, init, changeTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = (): ThemeContextType => {
   const context = useContext(ThemeContext);

   if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
   }

   return context;
};

export { ThemeProvider, useTheme };
