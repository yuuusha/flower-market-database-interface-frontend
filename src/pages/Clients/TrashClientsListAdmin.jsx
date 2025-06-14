import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useClientData from '../../hooks/useClients';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ClientSearchForm from '../../components/Clients/ClientSearchForm';
import ClientsTable from '../../components/Clients/ClientsTable';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import '../../styles/pinkPagination.css';

const TrashClientsListAdmin = () => {
  const navigate = useNavigate();
  const {
    clients,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleUnDeleteClient,
    loading,
    error
  } = useClientData({ showDeleted: true, isAdmin: true });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (clientId) => {
    navigate(`/admin/clients/${clientId}`, { state: { fromTrash: true } });
  };

  const handleUnDelete = async (clientId) => {
    await handleUnDeleteClient(clientId);
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
        <Alert variant="info">Нет клиентов в архиве</Alert>
      ) : (
        <>
          <ClientsTable
            clients={clients}
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

export default TrashClientsListAdmin;
