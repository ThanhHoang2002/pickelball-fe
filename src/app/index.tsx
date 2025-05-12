import { AppProvider } from './provider';
import { Router } from './router';

export const App = () => {
  return (
    <AppProvider>
      <Router/>
    </AppProvider>
  );
};
