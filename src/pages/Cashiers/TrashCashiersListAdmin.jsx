import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCashierData from '../../hooks/useCashiers';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import CashierSearchForm from '../../components/Cashiers/CashierSearchForm';
import CashiersTable from '../../components/Cashiers/CashiersTable';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import '../../styles/pinkPagination.css';

const TrashCashiersListAdmin = () => {
  const navigate = useNavigate();
  const {
    cashiers,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleUnDeleteCashier,
    loading,
    error
  } = useCashierData({ showDeleted: true, isAdmin: true });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (cashierId) => {
    navigate(`/admin/cashiers/${cashierId}`, { state: { fromTrash: true } });
  };

  const handleUnDelete = async (cashierId) => {
    await handleUnDeleteCashier(cashierId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <CashierSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {cashiers.length === 0 ? (
        <Alert variant="info">Нет кассиров в архиве</Alert>
      ) : (
        <>
          <CashiersTable
            cashiers={cashiers}
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

export default TrashCashiersListAdmin;
