import React from 'react';
import { Card, Table, Spinner, Alert } from 'react-bootstrap';

const getProductType = (typeId) => {
  switch (typeId) {
    case 1:
      return 'Цветок';
    case 2:
      return 'Букет';
    case 3:
      return 'Доп. товар';
    default:
      return 'Неизвестный тип';
  }
};

const ProductDetailsComponent = ({ product, relatedItems, loading, error }) => {
  return (
    <>
      <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
        <h2 className="m-0">
          Детали продукта: <br /> {product.Name}
        </h2>
      </Card.Header>
      <Card.Body className="p-5 pb-0">
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Тип продукта:</strong> {getProductType(product.Type_id)}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Цена:</strong> {product.Price}
        </Card.Text>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          product.Type_id !== 3 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID продукта</th>
                  <th>Наименование</th>
                  <th>Количество</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {relatedItems.map((item) => (
                  <tr key={item.Product_id}>
                    <td>{item.Product_id}</td>
                    <td>{item.Name}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.Price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        )}
      </Card.Body>
    </>
  );
};

export default ProductDetailsComponent;
