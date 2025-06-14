import { useState, useEffect } from 'react';
import {
  getClient,
  updateClient,
  getClients,
  deleteClient,
  deleteForeverClient,
  unDeleteClient,
  addClient,
  handleDeleteClientState,
  handleDeleteForeverClientState,
  handleUnDeleteClientState
} from '../api/Clients';

// Универсальный хук для управления данными клиента и списком клиентов
const useClients = ({
  clientId = null,
  setClient = null,
  showDeleted = false,
  isAdmin = false,
  isForm = false
} = {}) => {
  const [formData, setFormData] = useState({
    clientId: '',
    First_name: '',
    Last_name: '',
    Middle_name: '',
    Client_address: '',
    Date_of_birth: '',
    Email: '',
    Phone_number: '',
    Discount: ''
  });
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerms, setSearchTerms] = useState(() => {
    const savedTerms = localStorage.getItem('searchTerms');
    return savedTerms ? JSON.parse(savedTerms) : {
      Last_name: '',
      First_name: '',
      Middle_name: '',
      Date_of_birth: ''
    };
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clientsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('searchTerms', JSON.stringify(searchTerms));
    const lowercasedTerms = {
      Last_name: (searchTerms.Last_name || '').toLowerCase(),
      First_name: (searchTerms.First_name || '').toLowerCase(),
      Middle_name: (searchTerms.Middle_name || '').toLowerCase(),
      Date_of_birth: (searchTerms.Date_of_birth || '').toLowerCase()
    };
    const visibleClients = clients.filter(client => {
      return (
        (client.Last_name || '').toLowerCase().includes(lowercasedTerms.Last_name) &&
        (client.First_name || '').toLowerCase().includes(lowercasedTerms.First_name) &&
        (client.Middle_name || '').toLowerCase().includes(lowercasedTerms.Middle_name) &&
        (client.Date_of_birth || '').toLowerCase().includes(lowercasedTerms.Date_of_birth)
      );
    });
    setFilteredClients(visibleClients);
  }, [searchTerms, clients]);


  // Получение данных конкретного клиента с сервера
  useEffect(() => {
    if (clientId) {
      const fetchClient = async () => {
        setLoading(true);
        try {
          const client = await getClient(clientId);
          setFormData(client);
          if (setClient) setClient(client);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить данные клиента');
          setLoading(false);
        }
      };
      fetchClient();
    } else {
      setLoading(false);
    }
  }, [clientId, setClient]);

  // Получение списка клиентов с сервера
  useEffect(() => {
    if (!clientId && !isForm) {
      const fetchClients = async () => {
        setLoading(true);
        try {
          const data = await getClients();
          setClients(data);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить список клиентов');
          setLoading(false);
        }
      };
      fetchClients();
    }
  }, [clientId, isForm]);

  // Фильтрация списка клиентов на основе условий поиска
  useEffect(() => {
    if (!clientId && !isForm) {
      const visibleClients = clients.filter(client =>
        (showDeleted ? client.is_deleted : !client.is_deleted) && // В зависимости от showDeleted фильтруем удаленных или активных клиентов
        Object.keys(searchTerms).every(key =>
          searchTerms[key] === '' || // Если условие поиска пустое, принимаем все значения
          (client[key] && client[key].toString().toLowerCase().includes(searchTerms[key].toLowerCase())) // Иначе проверяем совпадение
        )
      );
      setFilteredClients(visibleClients);
    }
  }, [searchTerms, clients, showDeleted, clientId, isForm]);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Обработчик изменения пола клиента
  const handleGenderChange = (e) => {
    setFormData(prevState => ({ ...prevState, gender: e.target.value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      if (clientId) {
        const updatedClient = await updateClient({ ...formData, clientId });
        if (setClient) setClient(updatedClient);
        navigate(isAdmin ? `/admin/clients/${clientId}` : `/clients/${clientId}`);
      } else {
        await addClient(formData);
        navigate(isAdmin ? '/admin/clients' : '/clients');
      }
    } catch (error) {
      setError('Не удалось сохранить данные клиента');
    }
  };

  // Обработчик удаления клиента (пометка как удаленного)
  const handleDeleteClient = async (clientId) => {
    try {
      await deleteClient(clientId); // Удаляем клиента на сервере
      handleDeleteClientState(clients, setClients, clientId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось удалить клиента');
    }
  };

  // Обработчик полного удаления клиента
  const handleDeleteForeverClient = async (clientId) => {
    try {
      await deleteForeverClient(clientId); // Полностью удаляем клиента на сервере
      handleDeleteForeverClientState(clients, setClients, clientId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось навсегда удалить клиента');
    }
  };

  // Обработчик восстановления удаленного клиента
  const handleUnDeleteClient = async (clientId) => {
    try {
      await unDeleteClient(clientId); // Восстанавливаем клиента на сервере
      handleUnDeleteClientState(clients, setClients, clientId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось восстановить клиента');
    }
  };

  return {
    // Данные конкретного клиента и обработчики формы
    formData,
    handleChange,
    handleGenderChange,
    handleSubmit,

    // Список клиентов и связанные функции
    clients: filteredClients.slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage),
    searchTerms, // Условия поиска
    setSearchTerms, // Функция для обновления условий поиска
    currentPage, // Текущая страница
    totalPages: Math.ceil(filteredClients.length / clientsPerPage), // Общее количество страниц
    setCurrentPage, // Функция для обновления текущей страницы
    handleDeleteClient, // Функция для удаления клиента
    handleDeleteForeverClient, // Функция для полного удаления клиента
    handleUnDeleteClient, // Функция для восстановления клиента

    // Общее состояние
    loading, // Состояние загрузки данных
    error // Состояние ошибки
  };
};

export default useClients;
