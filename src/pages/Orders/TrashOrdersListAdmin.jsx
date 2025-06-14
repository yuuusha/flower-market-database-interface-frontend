import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useOrderData from '../../hooks/useOrders';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import OrderSearchForm from '../../components/Orders/OrderSearchForm';
import OrdersTable from '../../components/Orders/OrdersTable';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import '../../styles/pinkPagination.css';

const TrashOrdersListAdmin = () => {
  const navigate = useNavigate();
  const {
    orders,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleUnDeleteOrder,
    loading,
    error
  } = useOrderData({ showDeleted: true, isAdmin: true });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (orderId) => {
    navigate(`/admin/orders/${orderId}`, { state: { fromTrash: true } });
  };

  const handleUnDelete = async (orderId) => {
    await handleUnDeleteOrder(orderId);
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
        <Alert variant="info">Нет заказов в архиве</Alert>
      ) : (
        <>
          <OrdersTable
            orders={orders}
            handleRowClick={handleRowClick}
            handleUnDelete={handleUnDelete}
            isTrash={true}
          />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};

export default TrashOrdersListAdmin;
