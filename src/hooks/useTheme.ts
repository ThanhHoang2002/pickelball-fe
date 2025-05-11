import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('dark-mode') === 'true'
  );

  useEffect(() => {
    // Apply theme on initial load
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
    localStorage.setItem('dark-mode', newMode.toString());
  };

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { darkMode, toggleDarkMode };
}; 