import { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { 
    name: 'Paddles',
    path: '/category/paddles',
    submenu: [
      { name: 'Best Selling Paddles', path: '/category/paddles?filter=bestseller' },
      { name: 'Beginner', path: '/category/paddles?skill=beginner' },
      { name: 'Intermediate', path: '/category/paddles?skill=intermediate' },
      { name: 'Advanced', path: '/category/paddles?skill=advanced' },
      { name: 'Shop All', path: '/category/paddles' },
    ]
  },
  { 
    name: 'Clothing',
    path: '/category/clothing',
    submenu: [
      { name: 'Dresses', path: '/category/clothing?type=dresses' },
      { name: 'Tops', path: '/category/clothing?type=tops' },
      { name: 'Bottoms', path: '/category/clothing?type=bottoms' },
      { name: 'Crewnecks', path: '/category/clothing?type=crewnecks' },
      { name: 'T-Shirts', path: '/category/clothing?type=t-shirts' },
      { name: 'Shop All', path: '/category/clothing' },
    ]
  },
  { 
    name: 'Accessories',
    path: '/category/accessories',
    submenu: [
      { name: 'Bags', path: '/category/accessories?type=bags' },
      { name: 'Balls', path: '/category/accessories?type=balls' },
      { name: 'Hats', path: '/category/accessories?type=hats' },
      { name: 'Socks', path: '/category/accessories?type=socks' },
      { name: 'Grip Tape', path: '/category/accessories?type=grip-tape' },
      { name: 'Paddle Covers', path: '/category/accessories?type=paddle-covers' },
      { name: 'Shop All', path: '/category/accessories' },
    ]
  }
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };
  
  const closeMenus = () => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
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
              aria-expanded="false"
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
            <Link to="/" className="flex items-center" onClick={closeMenus}>
              <span className="text-2xl font-bold">Hoang Tu Sport</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:mr-16 md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="group relative">
                <Link 
                  to={link.path} 
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  {link.name}
                </Link>
                
                {link.submenu && (
                  <div className="absolute left-0 z-10 mt-2 hidden w-48 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block">
                    <div className="py-1">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.name}
                          to={sublink.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Search, account, cart */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              className="p-2 text-gray-700 hover:text-black"
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
            
            <Link to="/account" className="p-2 text-gray-700 hover:text-black">
              <span className="sr-only">Account</span>
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
            
            <Link to="/cart" className="p-2 text-gray-700 hover:text-black">
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
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <div 
                  className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700"
                  onClick={() => link.submenu && toggleSubmenu(link.name)}
                >
                  <Link 
                    to={link.path}
                    onClick={closeMenus}
                    className="block"
                  >
                    {link.name}
                  </Link>
                  
                  {link.submenu && (
                    <svg
                      className={`h-5 w-5 transform text-gray-500 transition-transform ${
                        openSubmenu === link.name ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                
                {link.submenu && openSubmenu === link.name && (
                  <div className="pl-4">
                    {link.submenu.map((sublink) => (
                      <Link
                        key={sublink.name}
                        to={sublink.path}
                        onClick={closeMenus}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}; 