import { useState } from 'react';
import { Link } from 'react-router-dom';

import UserInfo from './UserInfo';

import { useCart } from '@/features/cart/hooks/useCart';

const navLinks = [
  { name: 'Paddles', path: '/category/paddles' },
  { name: 'Accessories', path: '/category/accessories' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow">
      {/* Free shipping announcement */}
      <div className="bg-black py-2 text-center text-sm text-white">
        Free shipping on all orders $150+
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          
          {/* Logo */}
          <div className="flex flex-1 justify-center md:justify-start">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-black">Hoang Tu Sport</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className="relative text-base font-medium text-gray-700 transition-colors after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:text-black hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Search, account, cart */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              className="p-2 text-gray-700 transition-colors hover:text-black"
              aria-label="Search"
            >
              <span className="sr-only">Search</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            
            
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 transition-colors hover:text-black"
              aria-label="Cart"
            >
              <span className="sr-only">Cart</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <UserInfo />

          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-4 pb-5 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className="block border-l-4 border-transparent py-3 pl-3 text-base font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}; 