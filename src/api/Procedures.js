import axios from './axiosConfig';

const handleRequest = async (method, url, data = {}) => {
  try {
    const response = await axios({ method, url, ...data });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при выполнении запроса ${method.toUpperCase()} ${url}:`, error);
    throw error;
  }
};

export const getTopEarningCashier = (startDate, endDate, mode) => {
  const params = new URLSearchParams({ startDate, endDate, mode });
  return handleRequest('get', `/procedures/topcashier?${params.toString()}`);
};

export const getProfit = (startDate, endDate) => {
  const params = new URLSearchParams({ startDate, endDate });
  return handleRequest('get', `/procedures/profit?${params.toString()}`);
};

export const getOrderCount = (startDate, endDate) => {
  const params = new URLSearchParams({ startDate, endDate });
  return handleRequest('get', `/procedures/ordercount?${params.toString()}`);
};

export const getClientSales = (startDate, endDate) => {
  const params = new URLSearchParams({ startDate, endDate });
  return handleRequest('get', `/procedures/clientsales?${params.toString()}`);
};

export const getActiveOrders = () => handleRequest('get', `/procedures/activeorders`);

export const getAmountByOrder = (orderId) => {
  const params = new URLSearchParams({ order_id: orderId });
  return handleRequest('get', `/procedures/orderamount?${params.toString()}`);
};
