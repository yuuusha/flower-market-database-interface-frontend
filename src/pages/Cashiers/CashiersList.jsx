import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useCashiers from '../../hooks/useCashiers';
import CashierSearchForm from '../../components/Cashiers/CashierSearchForm';
import CashiersTable from '../../components/Cashiers/CashiersTable';
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

const CashiersList = ({ buttonName, buttonLink, isAdmin = false }) => {
  const {
    cashiers,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteCashier,
    loading,
    error
  } = useCashiers({ isAdmin });

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (cashierId) => {
    navigate(isAdmin ? `/admin/cashiers/${cashierId}` : `/cashiers/${cashierId}`);
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
        <Alert variant="info">Нет кассиров</Alert>
      ) : (
        <>
          <CashiersTable 
            cashiers={cashiers} 
            handleRowClick={handleRowClick} 
            handleDelete={handleDeleteCashier} 
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

export default CashiersList;
