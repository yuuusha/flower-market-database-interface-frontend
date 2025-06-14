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

// Добавить нового кассира на сервер
export const addCashier = (cashierData) => {
  const params = new URLSearchParams({
    last_name: cashierData.Last_name,
    first_name: cashierData.First_name,
    middle_name: cashierData.Middle_name,
    date_of_birth: cashierData.Date_of_birth,
    phone_number: cashierData.Phone_number,
    experience: cashierData.Experience
  });

  return handleRequest('post', `/cashier?${params.toString()}`);
};

// Обновить данные существующего кассира на сервере
export const updateCashier = (cashierData) => {
  const params = new URLSearchParams({
    last_name: cashierData.Last_name,
    first_name: cashierData.First_name,
    middle_name: cashierData.Middle_name,
    date_of_birth: cashierData.Date_of_birth,
    phone_number: cashierData.Phone_number,
    experience: cashierData.Experience,
    cashier_id: cashierData.cashierId
  });

  return handleRequest('put', `/cashier?${params.toString()}`);
};

// Получить данные конкретного кассира по ID
export const getCashier = (cashierId) => handleRequest('get', `/cashier/${cashierId}`);

// Получить список кассиров с параметрами лимита и смещения
export const getCashiers = () => handleRequest('get', '/cashier', {});

// Удалить кассира (пометить как удаленного) на сервере
export const deleteCashier = async (cashierId) => {
  await handleRequest('delete', `/cashier`, { params: { cashier_id: cashierId } });
};

// Удалить кассира навсегда на сервере
export const deleteForeverCashier = async (cashierId) => {
  await handleRequest('delete', `/super-admin-cashiers/${cashierId}`);
};

// Восстановить удаленного кассира на сервере
export const unDeleteCashier = async (cashierId) => {
  await handleRequest('patch', `/cashier`, { params: { cashier_id: cashierId } });
};

// Обновить состояние кассира в локальном хранилище
export const updateCashierState = (cashiers, setCashiers, updatedCashier) => {
  setCashiers(cashiers.map(c => c.cashierId === updatedCashier.cashierId ? updatedCashier : c));
};

// Добавить нового кассира в локальное хранилище
export const addCashierState = (cashiers, setCashiers, newCashier) => {
  const newCashierId = cashiers.length ? Math.max(...cashiers.map(c => c.cashierId)) + 1 : 1;
  setCashiers([...cashiers, { ...newCashier, cashierId: newCashierId }]);
};

// Пометить кассира как удаленного в локальном хранилище
export const handleDeleteCashierState = (cashiers, setCashiers, cashierId) => {
  setCashiers(cashiers.map(cashier => {
    if (cashier.cashierId === cashierId) {
      return { ...cashier, is_deleted: true };
    }
    return cashier;
  }));
};

// Удалить кассира навсегда из локального хранилища
export const handleDeleteForeverCashierState = (cashiers, setCashiers, cashierId) => {
  setCashiers(cashiers.filter(cashier => cashier.cashierId !== cashierId));
};

// Восстановить кассира из удаленных в локальном хранилище
export const handleUnDeleteCashierState = (cashiers, setCashiers, cashierId) => {
  setCashiers(cashiers.map(cashier => {
    if (cashier.cashierId === cashierId) {
      return { ...cashier, is_deleted: false };
    }
    return cashier;
  }));
};
