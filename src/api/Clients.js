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

// Добавить нового клиента на сервер
export const addClient = (clientData) => {
  const params = new URLSearchParams({
    last_name: clientData.Last_name,
    first_name: clientData.First_name,
    middle_name: clientData.Middle_name,
    date_of_birth: clientData.Date_of_birth,
    client_address: clientData.Client_address,
    phone_number: clientData.Phone_number,
    email: clientData.Email,
    discount: clientData.Discount
  });

  return handleRequest('post', `/client?${params.toString()}`);
};

// Обновить данные существующего клиента на сервере
export const updateClient = (clientData) => {
  const params = new URLSearchParams({
    last_name: clientData.Last_name,
    first_name: clientData.First_name,
    middle_name: clientData.Middle_name,
    date_of_birth: clientData.Date_of_birth,
    client_address: clientData.Client_address,
    phone_number: clientData.Phone_number,
    email: clientData.Email,
    discount: clientData.Discount,
    client_id: clientData.clientId
  });

  return handleRequest('put', `/client?${params.toString()}`);
};

// Получить данные конкретного клиента по ID
export const getClient = (clientId) => handleRequest('get', `/client/${clientId}`);

// Получить список клиентов с параметрами лимита и смещения
export const getClients = () => handleRequest('get', '/client', {});

// Удалить клиента (пометить как удаленного) на сервере
export const deleteClient = async (clientId) => {
  await handleRequest('delete', `/client`, { params: { client_id: clientId } });
};

// Удалить клиента навсегда на сервере
export const deleteForeverClient = async (clientId) => {
  await handleRequest('delete', `/super-admin-clients/${clientId}`);
};

// Восстановить удаленного клиента на сервере
export const unDeleteClient = async (clientId) => {
  await handleRequest('patch', `/client`, { params: { client_id: clientId } });
};

// Обновить состояние клиента в локальном хранилище
export const updateClientState = (clients, setClients, updatedClient) => {
  setClients(clients.map(c => c.clientId === updatedClient.clientId ? updatedClient : c));
};

// Добавить нового клиента в локальное хранилище
export const addClientState = (clients, setClients, newClient) => {
  const newClientId = clients.length ? Math.max(...clients.map(c => c.clientId)) + 1 : 1;
  setClients([...clients, { ...newClient, clientId: newClientId }]);
};

// Пометить клиента как удаленного в локальном хранилище
export const handleDeleteClientState = (clients, setClients, clientId) => {
  setClients(clients.map(client => {
    if (client.clientId === clientId) {
      return { ...client, is_deleted: true };
    }
    return client;
  }));
};

// Удалить клиента навсегда из локального хранилища
export const handleDeleteForeverClientState = (clients, setClients, clientId) => {
  setClients(clients.filter(client => client.clientId !== clientId));
};

// Восстановить клиента из удаленных в локальном хранилище
export const handleUnDeleteClientState = (clients, setClients, clientId) => {
  setClients(clients.map(client => {
    if (client.clientId === clientId) {
      return { ...client, is_deleted: false };
    }
    return client;
  }));
};
