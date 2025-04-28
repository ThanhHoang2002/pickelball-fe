import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <main className="sm:flex">
              <p className="text-4xl font-bold tracking-tight text-black sm:text-5xl">404</p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Page not found
                  </h1>
                  <p className="mt-1 text-base text-gray-500">
                    Please check the URL in the address bar and try again.
                  </p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
                  >
                    Go back home
                  </Link>
                  <Link
                    to="/category/paddles"
                    className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Browse products
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-red-600 sm:text-5xl">Error</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Something went wrong
              </h1>
              <p className="mt-1 text-base text-gray-500">
                An unexpected error occurred. Please try again later.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default ErrorBoundary;