import { useState, useEffect } from 'react';
import {
  getOrder,
  updateOrder,
  getOrders,
  deleteOrder,
  deleteForeverOrder,
  unDeleteOrder,
  addOrder,
  handleDeleteOrderState,
  handleDeleteForeverOrderState,
  handleUnDeleteOrderState
} from '../api/Orders';

// Универсальный хук для управления данными заказа и списком заказов
const useOrders = ({
  orderId = null,
  setOrder = null,
  showDeleted = false,
  isAdmin = false,
  isForm = false
} = {}) => {
  const [formData, setFormData] = useState({
    orderId: '',
    Client_id: '',
    Order_date: ''
  });
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerms, setSearchTerms] = useState(() => {
    const savedTerms = localStorage.getItem('searchTerms');
    return savedTerms ? JSON.parse(savedTerms) : {
      Client_id: '',
      Order_date: ''
    };
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ordersPerPage = 5;

  useEffect(() => {
    localStorage.setItem('searchTerms', JSON.stringify(searchTerms));
    const lowercasedTerms = {
      Client_id: (searchTerms.Client_id || '').toString().toLowerCase(),
      Order_date: (searchTerms.Order_date || '').toString().toLowerCase()
    };
    const visibleOrders = orders.filter(order => {
      return (
        (order.Client_id || '').toString().toLowerCase().includes(lowercasedTerms.Client_id) &&
        (order.Order_date || '').toString().toLowerCase().includes(lowercasedTerms.Order_date)
      );
    });
    setFilteredOrders(visibleOrders);
  }, [searchTerms, orders]);

  // Получение данных конкретного заказа с сервера
  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const order = await getOrder(orderId);
          setFormData(order);
          if (setOrder) setOrder(order);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить данные заказа');
          setLoading(false);
        }
      };
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [orderId, setOrder]);

  // Получение списка заказов с сервера
  useEffect(() => {
    if (!orderId && !isForm) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const data = await getOrders();
          setOrders(data);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить список заказов');
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [orderId, isForm]);

  // Фильтрация списка заказов на основе условий поиска
  useEffect(() => {
    if (!orderId && !isForm) {
      const visibleOrders = orders.filter(order =>
        (showDeleted ? order.Order_status : !order.Order_status) && // В зависимости от showDeleted фильтруем удаленных или активных заказов
        Object.keys(searchTerms).every(key =>
          searchTerms[key] === '' || // Если условие поиска пустое, принимаем все значения
          (order[key] && order[key].toString().toLowerCase().includes(searchTerms[key].toString().toLowerCase())) // Иначе проверяем совпадение
        )
      );
      setFilteredOrders(visibleOrders);
    }
  }, [searchTerms, orders, showDeleted, orderId, isForm]);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      if (orderId) {
        const updatedOrder = await updateOrder({ ...formData, orderId });
        if (setOrder) setOrder(updatedOrder);
        navigate(isAdmin ? `/admin/orders/${orderId}` : `/orders/${orderId}`);
      } else {
        await addOrder(formData);
        navigate(isAdmin ? '/admin/orders' : '/orders');
      }
    } catch (error) {
      setError('Не удалось сохранить данные заказа');
    }
  };

  // Обработчик удаления заказа (пометка как удаленного)
  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId); // Удаляем заказ на сервере
      handleDeleteOrderState(orders, setOrders, orderId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось удалить заказ');
    }
  };

  // Обработчик полного удаления заказа
  const handleDeleteForeverOrder = async (orderId) => {
    try {
      await deleteForeverOrder(orderId); // Полностью удаляем заказ на сервере
      handleDeleteForeverOrderState(orders, setOrders, orderId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось навсегда удалить заказ');
    }
  };

  // Обработчик восстановления удаленного заказа
  const handleUnDeleteOrder = async (orderId) => {
    try {
      await unDeleteOrder(orderId); // Восстанавливаем заказ на сервере
      handleUnDeleteOrderState(orders, setOrders, orderId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось восстановить заказ');
    }
  };

  return {
    // Данные конкретного заказа и обработчики формы
    formData,
    handleChange,
    handleSubmit,

    // Список заказов и связанные функции
    orders: filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage),
    searchTerms, // Условия поиска
    setSearchTerms, // Функция для обновления условий поиска
    currentPage, // Текущая страница
    totalPages: Math.ceil(filteredOrders.length / ordersPerPage), // Общее количество страниц
    setCurrentPage, // Функция для обновления текущей страницы
    handleDeleteOrder, // Функция для удаления заказа
    handleDeleteForeverOrder, // Функция для полного удаления заказа
    handleUnDeleteOrder, // Функция для восстановления заказа

    // Общее состояние
    loading, // Состояние загрузки данных
    error // Состояние ошибки
  };
};

export default useOrders;
