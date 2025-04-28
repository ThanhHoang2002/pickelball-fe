import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CartPage } from '@/app/pages/cart/CartPage';
import { HomePage } from '@/app/pages/HomePage';
import { CategoryPage } from '@/app/pages/product/CategoryPage';
import { ProductDetailsPage } from '@/app/pages/product/ProductDetailsPage';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { MainLayout } from '@/components/layout/main-layout/MainLayout';

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
        path: 'products/:slug',
        element: <ProductDetailsPage />,
      },
      {
        path: 'category/:category',
        element: <CategoryPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'sale',
        element: <CategoryPage />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};