import { App } from './App.tsx';
import { GlobalStyle } from './global-styles.ts';
import { MeterStore } from '../store/meter-store.ts';
import { Provider } from '../hooks/useStore.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';

const store = MeterStore.create({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>
);
