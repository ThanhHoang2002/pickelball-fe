import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorBoundary from '@/components/errors/ErrorBoundary';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { MainLayout } from '@/components/layout/main-layout/MainLayout';
import GlobalLoading from '@/components/loading/GlobalLoading';
import AdminDashboardRedirect from '@/features/auth/components/AdminDashboardRedirect';
import AdminGuard from '@/features/auth/components/AdminGuard';
import AuthGuard from '@/features/auth/components/AuthGuard';
import EmployeeGuard from '@/features/auth/components/Employee';

// Constants
const ROUTES = {
  HOME: '/',
  PRODUCT_DETAILS: '/products/:id',
  CATEGORY: '/category/:category',
  CONTACT: '/contact',
  ABOUT: '/about',
  CART: '/cart',
  PROFILE: '/profile',
  CHECKOUT: '/checkout/*',
  ORDER_CONFIRMATION: '/confirmation/:orderId',
  MY_ORDERS: '/my-orders',
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    CUSTOMERS: '/admin/customers',
    CATEGORIES: '/admin/categories',
    SUPPLIERS: '/admin/suppliers',
    PROFILE: '/admin/profile',
  },
};

// Client pages
const HomePage = lazy(() => import('@/app/pages/client/HomePage'));
const AboutPage = lazy(() => import('@/app/pages/client/AboutPage'));
const ContactPage = lazy(() => import('@/app/pages/client/ContactPage'));
const CartPage = lazy(() => import('@/app/pages/client/CartPage'));
const ProductDetailsPage = lazy(() => import('@/app/pages/client/ProductDetailsPage').then(module => ({ default: module.ProductDetailsPage })));
const CategoryPage = lazy(() => import('@/app/pages/client/CategoryPage').then(module => ({ default: module.CategoryPage })));
const CheckoutPage = lazy(() => import('@/app/pages/client/CheckoutPage'));
const ProfilePage = lazy(() => import('@/app/pages/client/ProfilePage'));
const MyOrdersPage = lazy(() => import('@/app/pages/client/MyOrdersPage'));
const OrderConfirmation = lazy(() => import('@/features/checkout/components/OrderConfirmation'));

// Admin pages
const DashboardPage = lazy(() => import('@/app/pages/admin/DashboardPage'));
const ProductPage = lazy(() => import('@/app/pages/admin/ProductPage'));
const OrderPage = lazy(() => import('@/app/pages/admin/OrderPage'));
const CustomerPage = lazy(() => import('@/app/pages/admin/CustomerPage'));
const SupplierPage = lazy(() => import('@/app/pages/admin/SupplierPage'));
const AdminCategoryPage = lazy(() => import('@/app/pages/admin/CategoryPage'));

// Route configuration
const routeConfig = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PRODUCT_DETAILS,
        element: <ProductDetailsPage />,
      },
      {
        path: ROUTES.CATEGORY,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.CONTACT,
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ABOUT,
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: ROUTES.CART,
            element: (
              <Suspense fallback={<GlobalLoading />}>
                <CartPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: ROUTES.CHECKOUT,
            element: <CheckoutPage />,
          },
          {
            path: ROUTES.ORDER_CONFIRMATION,
            element: (
              <Suspense fallback={<GlobalLoading />}>
                <OrderConfirmation />
              </Suspense>
            ),
          },
          {
            path: ROUTES.MY_ORDERS,
            element: (
              <Suspense fallback={<GlobalLoading />}>
                <MyOrdersPage />
              </Suspense>
            ),
          },
        ],
      }
    ],
  },
  {
    path: ROUTES.ADMIN.ROOT,
    element: (
      <Suspense fallback={<GlobalLoading />}>
        <EmployeeGuard>
          <DashboardLayout />
        </EmployeeGuard>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardRedirect />
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <AdminGuard>
              <DashboardPage />
            </AdminGuard>
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <OrderPage />
          </Suspense>
        ),
      },
      {
        path: 'customers',
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <AdminGuard>
              <CustomerPage />
            </AdminGuard>
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <AdminCategoryPage />
          </Suspense>
        ),
      },
      {
        path: 'suppliers',
        element: (
          <Suspense fallback={<GlobalLoading />}>
            <SupplierPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      }
    ],
  },
];

const router = createBrowserRouter(routeConfig);

export const Router = () => {
  return <RouterProvider router={router} />;
};