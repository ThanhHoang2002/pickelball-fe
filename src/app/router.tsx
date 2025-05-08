import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CategoryPage } from '@/app/pages/client/CategoryPage';
import { ProductDetailsPage } from '@/app/pages/client/ProductDetailsPage';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { MainLayout } from '@/components/layout/main-layout/MainLayout';
import AuthGuard from '@/features/auth/components/AuthGuard';
const ContactPage = lazy(() => import('@/app/pages/client/ContactPage'));
const HomePage = lazy(() => import('@/app/pages/client/HomePage'));
const AboutPage = lazy(() => import('@/app/pages/client/AboutPage'));
const CartPage = lazy(() => import('@/app/pages/client/CartPage'));
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
        ],
      }
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};