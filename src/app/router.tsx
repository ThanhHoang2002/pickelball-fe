import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import CheckoutPage from './pages/client/CheckoutPage';
import ProfilePage from './pages/client/ProfilePage';

import { CategoryPage } from '@/app/pages/client/CategoryPage';
import { ProductDetailsPage } from '@/app/pages/client/ProductDetailsPage';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { MainLayout } from '@/components/layout/main-layout/MainLayout';
import GlobalLoading from '@/components/loading/GlobalLoading';
import AdminGuard from '@/features/auth/components/AdminGuard';
import AuthGuard from '@/features/auth/components/AuthGuard';
const ContactPage = lazy(() => import('@/app/pages/client/ContactPage'));
const HomePage = lazy(() => import('@/app/pages/client/HomePage'));
const AboutPage = lazy(() => import('@/app/pages/client/AboutPage'));
const CartPage = lazy(() => import('@/app/pages/client/CartPage'));
const DashboardPage = lazy(() => import('@/app/pages/admin/DashboardPage'));
const ProductPage = lazy(() => import('@/app/pages/admin/ProductPage'));
const OrderPage = lazy(() => import('@/app/pages/admin/OrderPage'));
const CustomerPage = lazy(() => import('@/app/pages/admin/CustomerPage'));
const Supplier = lazy(() => import('@/app/pages/admin/SupplierPage'));
const AdminCategoryPage = lazy(() => import('@/app/pages/admin/CategoryPage'));
const OrderConfirmation = lazy(() => import('@/features/checkout/components/OrderConfirmation'));
const MyOrdersPage = lazy(() => import('@/app/pages/client/MyOrdersPage'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: 'category/:category',
        element: <CategoryPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: 'cart',
            element: <CartPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'checkout/*',
            element: <CheckoutPage />,
          },
          {
            path: 'confirmation/:orderId',
            element: <OrderConfirmation />,
          },
          {
            path: 'my-orders',
            element: <MyOrdersPage />,
          },
        ],
      }
    ],
  },
  {
    path: 'admin',
       element: <Suspense fallback={<GlobalLoading/>} ><AdminGuard><DashboardLayout /></AdminGuard></Suspense>,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'orders',
        element: <OrderPage />,
      },
      {
        path: 'customers',
        element: <CustomerPage />,
      },
      {
        path: 'categories',
        element: <AdminCategoryPage />,
      },
      {
        path: 'suppliers',
        element: <Supplier />,
      }
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};