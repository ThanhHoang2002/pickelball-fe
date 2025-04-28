# Recess Pickleball Website Clone

A modern e-commerce website for Recess Pickleball, built with React, TypeScript, and TailwindCSS.

## Features

- 🛍️ Browse products by category (paddles, sets, clothing, accessories)
- 🔍 Filter products by skill level and other attributes
- 🛒 Add products to cart with size and color options
- 💰 Cart with quantity adjustments and order summary
- 📱 Fully responsive design for all screen sizes

## Technology Stack

- **Frontend Framework**: React 19
- **Type Safety**: TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router v7
- **State Management**: Zustand (for cart)
- **Data Fetching**: TanStack Query (React Query)
- **Build Tool**: Vite

## Project Structure

This project follows a feature-based folder structure for better organization and scalability:

```sh
src
|
+-- app               # Application layer
|   +-- pages         # Application routes
|   +-- app.tsx       # Main app component
|   +-- provider.tsx  # Application provider
|   +-- router.tsx    # Router configuration
|
+-- assets            # Static assets like images
|
+-- components        # Shared components
|   +-- errors        # Error handling components
|   +-- layout        # Layout components
|   +-- ui            # Basic UI components
|
+-- config            # Global configuration
|
+-- features          # Feature-based modules
|   +-- products      # Products feature
|       +-- api       # API for products
|       +-- components# Product components
|       +-- hooks     # Hooks for products
|       +-- types     # Types for products
|
+-- stores            # Global state stores
|
+-- utils             # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install` or `pnpm install`
3. Start the development server with `npm run dev` or `pnpm dev`
4. Build for production with `npm run build` or `pnpm build`

## Development

This project uses:
- ESLint for code quality
- Husky for Git hooks
- Conventional Commits for commit messages

## License

MIT