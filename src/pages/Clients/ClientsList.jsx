import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useClients from '../../hooks/useClients';
import ClientSearchForm from '../../components/Clients/ClientSearchForm';
import ClientsTable from '../../components/Clients/ClientsTable';
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

const ClientsList = ({ buttonName, buttonLink, isAdmin = false }) => {
  const {
    clients,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteClient,
    loading,
    error
  } = useClients({ isAdmin });

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (clientId) => {
    navigate(isAdmin ? `/admin/clients/${clientId}` : `/clients/${clientId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <ClientSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {clients.length === 0 ? (
        <Alert variant="info">Нет клиентов</Alert>
      ) : (
        <>
          <ClientsTable 
            clients={clients} 
            handleRowClick={handleRowClick} 
            handleDelete={handleDeleteClient} 
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

export default ClientsList;
