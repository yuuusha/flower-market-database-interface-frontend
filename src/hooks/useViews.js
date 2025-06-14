import { useState } from 'react';
import { getBouquetFlowerView, getReceiptView } from '../api/Views';

const useViews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleView = async (view) => {
    setLoading(true);
    setError(null);
    try {
      const result = await view();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getBouquetFlowerView: () => handleView(getBouquetFlowerView),
    getReceiptView: () => handleView(getReceiptView)
  };
};

export default useViews;
