import React from 'react';
import { Card } from 'react-bootstrap';

const CashierDetailsComponent = ({ cashier }) => {
  return (
    <>
      <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
        <h2 className="m-0">
          Детали кассира: <br/> {cashier.Last_name} {cashier.First_name} {cashier.Middle_name}
        </h2>
      </Card.Header>
      <Card.Body className="p-5 pb-0">
        {/* Enhanced styling for cashier details */}
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Дата рождения:</strong> {cashier.Date_of_birth}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Номер телефона:</strong> {cashier.Phone_number}
        </Card.Text>
        <Card.Text className="mb-4" style={{ fontSize: '1.3rem' }}>
          <strong>Опыт работы:</strong> {cashier.Experience}
        </Card.Text>
      </Card.Body>
    </>
  );
};

export default CashierDetailsComponent;
