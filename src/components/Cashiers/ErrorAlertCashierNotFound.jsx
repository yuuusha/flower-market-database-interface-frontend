import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const ErrorAlert = ({ message }) => (
  <Container>
    <Alert variant="danger" className="mt-4">
      <h2>Ошибка: Кассир не найден</h2>
      <p>{message}</p>
    </Alert>
  </Container>
);

export default ErrorAlert;