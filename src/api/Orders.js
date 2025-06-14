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

// Добавить новый заказ на сервер
export const addOrder = (orderData) => {
  const params = new URLSearchParams({
    client_id: orderData.Client_id,
    order_date: orderData.Order_date
  });

  return handleRequest('post', `/order?${params.toString()}`);
};

// Обновить данные существующего заказа на сервере
export const updateOrder = (orderData) => {
  const params = new URLSearchParams({
    client_id: orderData.Client_id,
    order_date: orderData.Order_date,
    order_id: orderData.orderId
  });

  return handleRequest('put', `/order?${params.toString()}`);
};

// Получить данные конкретного заказа по ID
export const getOrder = (orderId) => handleRequest('get', `/order/${orderId}`);

// Получить список заказов с параметрами лимита и смещения
export const getOrders = () => handleRequest('get', '/order', {});

// Удалить заказ (пометить как удаленный) на сервере
export const deleteOrder = async (orderId) => {
  await handleRequest('delete', `/order`, { params: { order_id: orderId } });
};

// Удалить заказ навсегда на сервере
export const deleteForeverOrder = async (orderId) => {
  await handleRequest('delete', `/super-admin-orders/${orderId}`);
};

// Восстановить удаленный заказ на сервере
export const unDeleteOrder = async (orderId) => {
  await handleRequest('patch', `/order`, { params: { order_id: orderId }});
};

// Обновить состояние заказа в локальном хранилище
export const updateOrderState = (orders, setOrders, updatedOrder) => {
  setOrders(orders.map(o => o.orderId === updatedOrder.orderId ? updatedOrder : o));
};

// Добавить новый заказ в локальное хранилище
export const addOrderState = (orders, setOrders, newOrder) => {
  const newOrderId = orders.length ? Math.max(...orders.map(o => o.orderId)) + 1 : 1;
  setOrders([...orders, { ...newOrder, orderId: newOrderId }]);
};

// Пометить заказ как удаленный в локальном хранилище
export const handleDeleteOrderState = (orders, setOrders, orderId) => {
  setOrders(orders.map(order => {
    if (order.orderId === orderId) {
      return { ...order, is_deleted: true };
    }
    return order;
  }));
};

// Удалить заказ навсегда из локального хранилища
export const handleDeleteForeverOrderState = (orders, setOrders, orderId) => {
  setOrders(orders.filter(order => order.orderId !== orderId));
};

// Получить продукты для заказа по ID заказа
export const getProductsForOrder = (orderId) => handleRequest('get', `/order/product/${orderId}`);


// Восстановить заказ из удаленных в локальном хранилище
export const handleUnDeleteOrderState = (orders, setOrders, orderId) => {
  setOrders(orders.map(order => {
    if (order.orderId === orderId) {
      return { ...order, is_deleted: false };
    }
    return order;
  }));
};
