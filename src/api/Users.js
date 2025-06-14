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

// Получить список пользователей
export const getUsers = () => handleRequest('get', '/admin-users');

// Удалить пользователя на сервере
export const deleteUser = async (userId) => {
  await handleRequest('delete', `/admin-users/${userId}`);
};

// Изменить права пользователя на сервере
export const changeUserRights = async (userId, newRole) => {
  await handleRequest('post', `/admin-users/userRights/${userId}`, { data: { role: newRole } });
};