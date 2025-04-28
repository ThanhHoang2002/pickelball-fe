import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import { Navbar } from './Navbar';

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}; 