import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { PinkButton, PinkLink } from '../../styles/PinkUI';
import '../../styles/HomePage.css';

const HomePage = () => {
  return (
    <Container className="home-page-container">
      <h1 className="home-page-title">Добро пожаловать в Цветочный магазинчик</h1>
      <p className="home-page-text">♡ Магазин цветет и пахнет! ♡</p>
      <div className="home-page-buttons">
        <PinkButton variant="pink" type="submit" as={PinkLink} to="/login" className="home-page-button">
          Войти
        </PinkButton>
      </div>
    </Container>
  );
};

export default HomePage;