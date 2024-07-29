'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react';

// Define the type for the props
interface ProvidersProps {
  children: ReactNode;
}

// The Providers component wraps its children with the Redux Provider
export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
