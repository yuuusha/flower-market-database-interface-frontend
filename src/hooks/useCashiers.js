import { useState, useEffect } from 'react';
import {
  getCashier,
  updateCashier,
  getCashiers,
  deleteCashier,
  deleteForeverCashier,
  unDeleteCashier,
  addCashier,
  handleDeleteCashierState,
  handleDeleteForeverCashierState,
  handleUnDeleteCashierState
} from '../api/Cashiers';

// Универсальный хук для управления данными кассира и списком кассиров
const useCashiers = ({
  cashierId = null,
  setCashier = null,
  showDeleted = false,
  isAdmin = false,
  isForm = false
} = {}) => {
  const [formData, setFormData] = useState({
    cashierId: '',
    First_name: '',
    Last_name: '',
    Middle_name: '',
    Date_of_birth: '',
    Phone_number: '',
    Experience: ''
  });
  const [cashiers, setCashiers] = useState([]);
  const [filteredCashiers, setFilteredCashiers] = useState([]);
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
  const cashiersPerPage = 5;

  useEffect(() => {
    localStorage.setItem('searchTerms', JSON.stringify(searchTerms));
    const lowercasedTerms = {
      Last_name: (searchTerms.Last_name || '').toLowerCase(),
      First_name: (searchTerms.First_name || '').toLowerCase(),
      Middle_name: (searchTerms.Middle_name || '').toLowerCase(),
      Date_of_birth: (searchTerms.Date_of_birth || '').toLowerCase()
    };
    const visibleCashiers = cashiers.filter(cashier => {
      return (
        (cashier.Last_name || '').toLowerCase().includes(lowercasedTerms.Last_name) &&
        (cashier.First_name || '').toLowerCase().includes(lowercasedTerms.First_name) &&
        (cashier.Middle_name || '').toLowerCase().includes(lowercasedTerms.Middle_name) &&
        (cashier.Date_of_birth || '').toLowerCase().includes(lowercasedTerms.Date_of_birth)
      );
    });
    setFilteredCashiers(visibleCashiers);
  }, [searchTerms, cashiers]);

  // Получение данных конкретного кассира с сервера
  useEffect(() => {
    if (cashierId) {
      const fetchCashier = async () => {
        setLoading(true);
        try {
          const cashier = await getCashier(cashierId);
          setFormData(cashier);
          if (setCashier) setCashier(cashier);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить данные кассира');
          setLoading(false);
        }
      };
      fetchCashier();
    } else {
      setLoading(false);
    }
  }, [cashierId, setCashier]);

  // Получение списка кассиров с сервера
  useEffect(() => {
    if (!cashierId && !isForm) {
      const fetchCashiers = async () => {
        setLoading(true);
        try {
          const data = await getCashiers();
          setCashiers(data);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить список кассиров');
          setLoading(false);
        }
      };
      fetchCashiers();
    }
  }, [cashierId, isForm]);

  // Фильтрация списка кассиров на основе условий поиска
  useEffect(() => {
    if (!cashierId && !isForm) {
      const visibleCashiers = cashiers.filter(cashier =>
        (showDeleted ? cashier.is_deleted : !cashier.is_deleted) && // В зависимости от showDeleted фильтруем удаленных или активных кассиров
        Object.keys(searchTerms).every(key =>
          searchTerms[key] === '' || // Если условие поиска пустое, принимаем все значения
          (cashier[key] && cashier[key].toString().toLowerCase().includes(searchTerms[key].toLowerCase())) // Иначе проверяем совпадение
        )
      );
      setFilteredCashiers(visibleCashiers);
    }
  }, [searchTerms, cashiers, showDeleted, cashierId, isForm]);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      if (cashierId) {
        const updatedCashier = await updateCashier({ ...formData, cashierId });
        if (setCashier) setCashier(updatedCashier);
        navigate(isAdmin ? `/admin/cashiers/${cashierId}` : `/cashiers/${cashierId}`);
      } else {
        await addCashier(formData);
        navigate(isAdmin ? '/admin/cashiers' : '/cashiers');
      }
    } catch (error) {
      setError('Не удалось сохранить данные кассира');
    }
  };

  // Обработчик удаления кассира (пометка как удаленного)
  const handleDeleteCashier = async (cashierId) => {
    try {
      await deleteCashier(cashierId); // Удаляем кассира на сервере
      handleDeleteCashierState(cashiers, setCashiers, cashierId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось удалить кассира');
    }
  };

  // Обработчик полного удаления кассира
  const handleDeleteForeverCashier = async (cashierId) => {
    try {
      await deleteForeverCashier(cashierId); // Полностью удаляем кассира на сервере
      handleDeleteForeverCashierState(cashiers, setCashiers, cashierId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось навсегда удалить кассира');
    }
  };

  // Обработчик восстановления удаленного кассира
  const handleUnDeleteCashier = async (cashierId) => {
    try {
      await unDeleteCashier(cashierId); // Восстанавливаем кассира на сервере
      handleUnDeleteCashierState(cashiers, setCashiers, cashierId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось восстановить кассира');
    }
  };

  return {
    // Данные конкретного кассира и обработчики формы
    formData,
    handleChange,
    handleSubmit,

    // Список кассиров и связанные функции
    cashiers: filteredCashiers.slice((currentPage - 1) * cashiersPerPage, currentPage * cashiersPerPage),
    searchTerms, // Условия поиска
    setSearchTerms, // Функция для обновления условий поиска
    currentPage, // Текущая страница
    totalPages: Math.ceil(filteredCashiers.length / cashiersPerPage), // Общее количество страниц
    setCurrentPage, // Функция для обновления текущей страницы
    handleDeleteCashier, // Функция для удаления кассира
    handleDeleteForeverCashier, // Функция для полного удаления кассира
    handleUnDeleteCashier, // Функция для восстановления кассира

    // Общее состояние
    loading, // Состояние загрузки данных
    error // Состояние ошибки
  };
};

export default useCashiers;
