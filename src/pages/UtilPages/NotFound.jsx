import React from 'react';
import { Container } from 'react-bootstrap';
import { PinkButton, PinkLink } from '../../styles/PinkUI';

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <PinkButton as={PinkLink} to="/" className="mt-3">
        Вернуться на главную
      </PinkButton>
    </Container>
  );
};

export default NotFound;
