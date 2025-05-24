import { Moon, Sun } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';


const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
      >
        <span className="sr-only">Toggle dark mode</span>
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{darkMode ? 'Toggle light mode' : 'Toggle dark mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle; 