import React, { useEffect, useState } from 'react';
import { Card, Table, Spinner, Alert } from 'react-bootstrap';
import { getProductsForOrder } from '../../api/Orders';

const OrderDetailsComponent = ({ order }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsForOrder(order.Order_id);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось получить продукты для заказа');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [order.Order_id]);

  return (
    <>
      <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
        <h2 className="m-0">
          Детали заказа: <br /> {order.Order_id}
        </h2>
      </Card.Header>
      <Card.Body className="p-5 pb-0">
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Дата заказа:</strong> {order.Order_date}
        </Card.Text>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID продукта</th>
                <th>Тип ID</th>
                <th>Наименование</th>
                <th>Количество</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.Product_id}>
                  <td>{product.Product_id}</td>
                  <td>{product.Type_id}</td>
                  <td>{product.Name}</td>
                  <td>{product.Quantity}</td>
                  <td>{product.Price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </>
  );
};

export default OrderDetailsComponent;
