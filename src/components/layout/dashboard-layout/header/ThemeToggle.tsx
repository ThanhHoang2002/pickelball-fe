import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';


const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      <span className="sr-only">Toggle dark mode</span>
      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle; 