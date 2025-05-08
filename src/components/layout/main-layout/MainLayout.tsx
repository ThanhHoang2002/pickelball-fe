import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from './Footer';
import { Navbar } from './navbar/Navbar';

import { AuthDialog } from '@/features/auth/components/AuthDialog';
import { useAuthFormStore } from '@/stores/authFormStore';

export const MainLayout = () => {
  const location = useLocation();
  const { isOpen, setIsOpen } = useAuthFormStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {isOpen && <AuthDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <Footer />
    </div>
  );
}; 