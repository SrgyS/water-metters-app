import { useEffect } from 'react';

import MetterList from '../components/metter-list';
import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';

export const App = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.fetchMeters();
  }, [store, store.currentPage]);

  const handlePageChange = (page: number) => {
    store.setPage(page);
  };

  return (
    <MetterList
      meters={store.meters}
      currentPage={store.currentPage}
      totalPages={store.totalPages}
      onPageChange={handlePageChange}
    />
  );
});
