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

// Добавить новый продукт на сервер
export const addProduct = (productData) => {
  const params = new URLSearchParams({
    type_id: productData.Type_id,
    name: productData.Name,
    price: productData.Price
  });

  return handleRequest('post', `/product?${params.toString()}`);
};

// Обновить данные существующего продукта на сервере
export const updateProduct = (productData) => {
  const params = new URLSearchParams({
    name: productData.Name,
    price: productData.Price,
    product_id: productData.productId
  });

  return handleRequest('put', `/product?${params.toString()}`);
};

// Получить данные конкретного продукта по ID
export const getProduct = (productId) => handleRequest('get', `/product/${productId}`);

// Получить список продуктов с параметрами лимита и смещения
export const getProducts = () => handleRequest('get', '/product', {});

// Получить букеты для цветка по ID
export const getBouquetsForFlower = (flowerId) => handleRequest('get', `/product/flowers/bouquets?flower_id=${flowerId}`);

// Получить цветы для букета по ID
export const getFlowersForBouquet = (bouquetId) => handleRequest('get', `/product/bouquets/flowers?bouquet_id=${bouquetId}`);

// Удалить продукт (пометить как удаленного) на сервере
export const deleteProduct = async (productId) => {
  await handleRequest('delete', `/product`, { params: { product_id: productId } });
};

// Удалить продукт навсегда на сервере
export const deleteForeverProduct = async (productId) => {
  await handleRequest('delete', `/super-admin-products/${productId}`);
};

// Восстановить удаленный продукт на сервере
export const unDeleteProduct = async (productId) => {
  await handleRequest('patch', `/product`, { params: { product_id: productId } });
};

// Обновить состояние продукта в локальном хранилище
export const updateProductState = (products, setProducts, updatedProduct) => {
  setProducts(products.map(p => p.productId === updatedProduct.productId ? updatedProduct : p));
};

// Добавить новый продукт в локальное хранилище
export const addProductState = (products, setProducts, newProduct) => {
  const newProductId = products.length ? Math.max(...products.map(p => p.productId)) + 1 : 1;
  setProducts([...products, { ...newProduct, productId: newProductId }]);
};

// Пометить продукт как удаленного в локальном хранилище
export const handleDeleteProductState = (products, setProducts, productId) => {
  setProducts(products.map(product => {
    if (product.productId === productId) {
      return { ...product, is_deleted: true };
    }
    return product;
  }));
};

// Удалить продукт навсегда из локального хранилища
export const handleDeleteForeverProductState = (products, setProducts, productId) => {
  setProducts(products.filter(product => product.productId !== productId));
};

// Восстановить продукт из удаленных в локальном хранилище
export const handleUnDeleteProductState = (products, setProducts, productId) => {
  setProducts(products.map(product => {
    if (product.productId === productId) {
      return { ...product, is_deleted: false };
    }
    return product;
  }));
};
