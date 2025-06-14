import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import OrderSearchForm from '../../components/Orders/OrderSearchForm';
import OrdersTable from '../../components/Orders/OrdersTable';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import '../../styles/pinkPagination.css';
import { PinkButton } from '../../styles/PinkUI';
import { jwtDecode } from 'jwt-decode';

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

const OrdersList = ({ buttonName, buttonLink, isAdmin = false }) => {
  const {
    orders,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteOrder,
    loading,
    error
  } = useOrders({ isAdmin });

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (orderId) => {
    navigate(isAdmin ? `/admin/orders/${orderId}` : `/orders/${orderId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <OrderSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {orders.length === 0 ? (
        <Alert variant="info">Нет заказов</Alert>
      ) : (
        <>
          <OrdersTable 
            orders={orders} 
            handleRowClick={handleRowClick} 
            handleDelete={handleDeleteOrder} 
            isAdmin={isAdmin} 
          />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </>
      )}
      {userRole === 'ADMIN' && (
      <div className="col text-center">
        <Link to={buttonLink} style={{ textDecoration: 'none' }}>
          <PinkButton variant="pink" className="mt-3 mb-3">
            {buttonName}
          </PinkButton>
        </Link>
      </div>
      )}
    </Container>
  );
};

export default OrdersList;
