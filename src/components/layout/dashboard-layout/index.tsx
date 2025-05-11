import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardSidebar from './dashboard-sidebar';
import { Header } from './header';

import { useScrollToTop } from '@/hooks/useScrollToTop';



type DashboardLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Use the scroll to top hook
  useScrollToTop();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow">
          <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 