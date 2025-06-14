import React from 'react';
import { Card } from 'react-bootstrap';

const ClientDetailsComponent = ({ client }) => {
  return (
    <>
      <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
        <h2 className="m-0">
          Детали клиента: <br/> {client.Last_name} {client.First_name} {client.Middle_name}
        </h2>
      </Card.Header>
      <Card.Body className="p-5 pb-0">
        {/* Enhanced styling for client details */}
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Email:</strong> {client.Email}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Дата рождения:</strong> {client.Date_of_birth}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Номер телефона:</strong> {client.Phone_number}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Адрес:</strong> {client.Client_address}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Скидка:</strong> {client.Discount}
        </Card.Text>
      </Card.Body>
    </>
  );
};

export default ClientDetailsComponent;
