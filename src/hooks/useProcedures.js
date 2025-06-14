import { useState } from 'react';
import { getTopEarningCashier, getProfit, getOrderCount, getClientSales, getActiveOrders, getAmountByOrder } from '../api/Procedures';

const useProcedures = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcedure = async (procedure, params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await procedure(...params);
      setData(result);
    } catch (err) {
      setError('Ошибка при выполнении запроса');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    handleProcedure,
    getTopEarningCashier,
    getProfit,
    getOrderCount,
    getClientSales,
    getActiveOrders,
    getAmountByOrder
  };
};

export default useProcedures;
