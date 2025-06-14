import { useState, useEffect } from 'react';
import {
  getProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  deleteForeverProduct,
  unDeleteProduct,
  addProduct,
  getBouquetsForFlower,
  getFlowersForBouquet,
  handleDeleteProductState,
  handleDeleteForeverProductState,
  handleUnDeleteProductState
} from '../api/Products';

// Универсальный хук для управления данными продукта и списком продуктов
const useProducts = ({
  productId = null,
  setProduct = null,
  showDeleted = false,
  isAdmin = false,
  isForm = false
} = {}) => {
  const [formData, setFormData] = useState({
    productId: '',
    Type_id: '',
    Name: '',
    Price: ''
  });
  const [relatedItems, setRelatedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerms, setSearchTerms] = useState(() => {
    const savedTerms = localStorage.getItem('searchTerms');
    return savedTerms ? JSON.parse(savedTerms) : {
      Type_id: '',
      Name: '',
      Price: ''
    };
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('searchTerms', JSON.stringify(searchTerms));
    const lowercasedTerms = {
      Type_id: String(searchTerms.Type_id || '').toLowerCase(),
      Name: String(searchTerms.Name || '').toLowerCase(),
      Price: String(searchTerms.Price || '').toLowerCase()
    };
    const visibleProducts = products.filter(product => {
      return (
        String(product.Type_id || '').toLowerCase().includes(lowercasedTerms.Type_id) &&
        String(product.Name || '').toLowerCase().includes(lowercasedTerms.Name) &&
        String(product.Price || '').toLowerCase().includes(lowercasedTerms.Price)
      );
    });
    setFilteredProducts(visibleProducts);
  }, [searchTerms, products]);

  useEffect(() => {
    const fetchRelatedItems = async () => {
      if (productId && setProduct) {
        try {
          const product = await getProduct(productId);
          setFormData(product);
          setProduct(product);

          if (product.Type_id === 1) {
            const data = await getBouquetsForFlower(productId);
            setRelatedItems(data);
          } else if (product.Type_id === 2) {
            const data = await getFlowersForBouquet(productId);
            setRelatedItems(data);
          }
        } catch (error) {
          setError('Не удалось получить данные продукта');
        } finally {
          setLoading(false);
        }
      }
    };

    if (productId) {
      fetchRelatedItems();
    } else {
      setLoading(false);
    }
  }, [productId, setProduct]);

  // Получение списка продуктов с сервера
  useEffect(() => {
    if (!productId && !isForm) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const data = await getProducts();
          setProducts(data);
          setLoading(false);
        } catch (error) {
          setError('Не удалось получить список продуктов');
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [productId, isForm]);

  // Фильтрация списка продуктов на основе условий поиска
  useEffect(() => {
    if (!productId && !isForm) {
      const visibleProducts = products.filter(product =>
        (showDeleted ? product.is_deleted : !product.is_deleted) && // В зависимости от showDeleted фильтруем удаленных или активных продуктов
        Object.keys(searchTerms).every(key =>
          searchTerms[key] === '' || // Если условие поиска пустое, принимаем все значения
          (String(product[key]).toLowerCase().includes(searchTerms[key].toLowerCase())) // Иначе проверяем совпадение
        )
      );
      setFilteredProducts(visibleProducts);
    }
  }, [searchTerms, products, showDeleted, productId, isForm]);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      if (productId) {
        const updatedProduct = await updateProduct({ ...formData, productId });
        if (setProduct) setProduct(updatedProduct);
        navigate(isAdmin ? `/admin/products/${productId}` : `/products/${productId}`);
      } else {
        await addProduct(formData);
        navigate(isAdmin ? '/admin/products' : '/products');
      }
    } catch (error) {
      setError('Не удалось сохранить данные продукта');
    }
  };

  // Обработчик удаления продукта (пометка как удаленного)
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId); // Удаляем продукт на сервере
      handleDeleteProductState(products, setProducts, productId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось удалить продукт');
    }
  };

  // Обработчик полного удаления продукта
  const handleDeleteForeverProduct = async (productId) => {
    try {
      await deleteForeverProduct(productId); // Полностью удаляем продукт на сервере
      handleDeleteForeverProductState(products, setProducts, productId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось навсегда удалить продукт');
    }
  };

  // Обработчик восстановления удаленного продукта
  const handleUnDeleteProduct = async (productId) => {
    try {
      await unDeleteProduct(productId); // Восстанавливаем продукт на сервере
      handleUnDeleteProductState(products, setProducts, productId); // Обновляем локальное состояние
    } catch (error) {
      setError('Не удалось восстановить продукт');
    }
  };

  return {
    // Данные конкретного продукта и обработчики формы
    formData,
    relatedItems,
    handleChange,
    handleSubmit,

    // Список продуктов и связанные функции
    products: filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage),
    searchTerms, // Условия поиска
    setSearchTerms, // Функция для обновления условий поиска
    currentPage, // Текущая страница
    totalPages: Math.ceil(filteredProducts.length / productsPerPage), // Общее количество страниц
    setCurrentPage, // Функция для обновления текущей страницы
    handleDeleteProduct, // Функция для удаления продукта
    handleDeleteForeverProduct, // Функция для полного удаления продукта
    handleUnDeleteProduct, // Функция для восстановления продукта

    // Общее состояние
    loading, // Состояние загрузки данных
    error // Состояние ошибки
  };
};

export default useProducts;
