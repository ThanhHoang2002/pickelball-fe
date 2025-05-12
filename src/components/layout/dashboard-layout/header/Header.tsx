import { Menu } from 'lucide-react';

import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

export interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20 lg:justify-end">
          {/* Left: Hamburger button */}
          <div className="flex lg:hidden">
            <button
              className="text-muted-foreground hover:text-foreground"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={handleToggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Right: Header items */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <div>
              <ThemeToggle />
            </div>
            {/* User dropdown */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 