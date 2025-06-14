import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { PinkButton, PinkLink } from '../../styles/PinkUI';
import { PinkNavDropdownItem } from '../../styles/PinkNavDropdownItem';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const isAuthenticated = !!token; // Проверка наличия токена

  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: '#ff69b4' }}>
      <Container>
        <Navbar.Brand as={PinkLink} to="/">Цветочный магазин</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mt-lg-0 mt-3">
          <Nav className="align-items-lg-center" style={{ gap: '1rem' }}>
            {isAuthenticated && userRole === 'ADMIN' && (
              <NavDropdown title="Кассиры" id="cashiers-dropdown">
              <PinkNavDropdownItem href="/admin/cashiers">Текущие кассиры</PinkNavDropdownItem>
              <PinkNavDropdownItem href="/admin/cashiers/trash">Кассиры в архиве</PinkNavDropdownItem>
            </NavDropdown>
            )}
            {isAuthenticated && userRole === 'ADMIN' && (
              <NavDropdown title="Клиенты" id="clients-dropdown">
                <PinkNavDropdownItem href="/admin/clients">Текущие клиенты</PinkNavDropdownItem>
                <PinkNavDropdownItem href="/admin/clients/trash">Клиенты в архиве</PinkNavDropdownItem>
              </NavDropdown>
            )}
            {isAuthenticated && userRole === 'ADMIN' && (
              <NavDropdown title="Товары" id="products-dropdown">
                <PinkNavDropdownItem href="/admin/products">Текущие товары</PinkNavDropdownItem>
                <PinkNavDropdownItem href="/admin/products/trash">Товары в архиве</PinkNavDropdownItem>
              </NavDropdown>
            )}
            {isAuthenticated && userRole === 'ADMIN' && (
              <NavDropdown title="Заказы" id="orders-dropdown">
                <PinkNavDropdownItem href="/admin/orders">Текущие заказы</PinkNavDropdownItem>
                <PinkNavDropdownItem href="/admin/orders/trash">Заказы в архиве</PinkNavDropdownItem>
              </NavDropdown>
            )}
            {isAuthenticated && userRole === 'USER' && (
              <Nav.Link as={PinkLink} to="/clients">Список клиентов</Nav.Link>
            )}
            {isAuthenticated && userRole === 'USER' && (
              <Nav.Link as={PinkLink} to="/cashiers">Список кассиров</Nav.Link>
            )}
            {isAuthenticated && userRole === 'USER' && (
              <Nav.Link as={PinkLink} to="/products">Список товаров</Nav.Link>
            )}
            {isAuthenticated && userRole === 'USER' && (
              <Nav.Link as={PinkLink} to="/orders">Список заказов</Nav.Link>
            )}
            {isAuthenticated && (userRole === 'USER' || userRole === 'ADMIN') && (
              <Nav.Link as={PinkLink} to="/procedures">Процедуры</Nav.Link>
            )}
            {isAuthenticated && (userRole === 'USER' || userRole === 'ADMIN') && (
              <Nav.Link as={PinkLink} to="/views">Представления</Nav.Link>
            )}
            {isAuthenticated && (
              <PinkButton variant="outline-light" onClick={handleLogout}>Выйти</PinkButton>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
