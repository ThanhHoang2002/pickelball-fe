import { 
  LayoutDashboard, 
  ShoppingBasket, 
  Users,
  X,
  Factory,
  List,
  ShoppingBag
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });


  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900 bg-opacity-30 transition-opacity duration-200 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-scroll bg-card duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between pl-6 pr-3 md:h-20">
          {/* Logo */}
          <NavLink to="/" className="block">
            <div className="flex items-center">
              <span className="ml-2 text-lg font-bold text-foreground">Hoang Tu Sport Admin</span>
            </div>
          </NavLink>
          {/* Close button (mobile only) */}
          <button
            ref={trigger}
            className="text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground">
              <span className="hidden w-6 text-center lg:block" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden">Pages</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li className={`mb-0.5 rounded-sm px-3 py-2 ${pathname === '/admin/dashboard' && 'bg-primary/10'}`}>
                <NavLink
                  to="/admin/dashboard"
                  className={`block truncate text-sm font-medium ${
                    pathname === '/admin/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="ml-3">Dashboard</span>
                  </div>
                </NavLink>
              </li>
              {/* Products */}
              <li className={`mb-0.5 rounded-sm px-3 py-2 ${pathname.includes('/admin/products') && 'bg-primary/10'}`}>
                <NavLink
                  to="/admin/products"
                  className={`block truncate text-sm font-medium ${
                    pathname.includes('/admin/products') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="ml-3">Products</span>
                  </div>
                </NavLink>
              </li>
              {/* Orders */}
              <li className={`mb-0.5 rounded-sm px-3 py-2 ${pathname.includes('/admin/orders') && 'bg-primary/10'}`}>
                <NavLink
                  to="/admin/orders"
                  className={`block truncate text-sm font-medium ${
                    pathname.includes('/admin/orders') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    <ShoppingBasket className="h-5 w-5" />
                    <span className="ml-3">Orders</span>
                  </div>
                </NavLink>
              </li>
              {/* Customers */}
              <li className={`mb-0.5 rounded-sm px-3 py-2 ${pathname.includes('/admin/customers') && 'bg-primary/10'}`}>
                <NavLink
                  to="/admin/customers"
                  className={`block truncate text-sm font-medium ${
                    pathname.includes('/admin/customers') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    <Users className="h-5 w-5" />
                    <span className="ml-3">Customers</span>
                  </div>
                </NavLink>
              </li> 

              {/* Categories */ }
              <li className={`mb-0.5 rounded-sm px-3 py-2 ${pathname.includes('/admin/categories') && 'bg-primary/10'}`}>
                <NavLink
                  to="/admin/categories"
                  className={`block truncate text-sm font-medium ${
                    pathname.includes('/admin/categories') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    <List className="h-5 w-5" />
                    <span className="ml-3">Categories</span>
                  </div>
                </NavLink>
              </li>

              {/* Suppliers */}
              <li className={`mb-0.5 rounded-sm px-3 py-2 ${pathname.includes('/admin/suppliers') && 'bg-primary/10'}`}>
                <NavLink
                  to="/admin/suppliers"
                  className={`block truncate text-sm font-medium ${
                    pathname.includes('/admin/suppliers') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    <Factory className="h-5 w-5" />
                    <span className="ml-3">Suppliers</span>
                  </div>
                </NavLink>  
              </li>
            </ul>
          </div>
          
          {/* Store link */}
          <div>
            <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground">
              <span className="hidden w-6 text-center lg:block" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden">Store</span>
            </h3>
            <ul className="mt-3">
              <li className="mb-0.5 rounded-sm px-3 py-2">
                <NavLink
                  to="/"
                  className="block truncate text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <div className="flex items-center">
                    <ShoppingBasket className="h-5 w-5" />
                    <span className="ml-3">View Store</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
                  
      </div>
    </div>
  );
};

export default DashboardSidebar; 