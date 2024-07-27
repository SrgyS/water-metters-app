import { MeterStoreInstance } from '../store/meter-store';
import { createContext, useContext } from 'react';

const RootStoreContext = createContext<null | MeterStoreInstance>(null);

export const Provider = RootStoreContext.Provider;

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};
