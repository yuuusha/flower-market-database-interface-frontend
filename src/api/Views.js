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

// Получить данные для представления "Букеты и цветы"
export const getBouquetFlowerView = () => handleRequest('get', '/view/bouquetflower');

// Получить данные для представления "Чеки"
export const getReceiptView = () => handleRequest('get', '/view/receipt');
