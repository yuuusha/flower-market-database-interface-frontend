import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useProductData from '../../hooks/useProducts';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ProductSearchForm from '../../components/Products/ProductSearchForm';
import ProductsTable from '../../components/Products/ProductsTable';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import '../../styles/pinkPagination.css';

const TrashProductsListAdmin = () => {
  const navigate = useNavigate();
  const {
    products,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleUnDeleteProduct,
    loading,
    error
  } = useProductData({ showDeleted: true, isAdmin: true });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (productId) => {
    navigate(`/admin/products/${productId}`, { state: { fromTrash: true } });
  };

  const handleUnDelete = async (productId) => {
    await handleUnDeleteProduct(productId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <ProductSearchForm
        searchTerms={searchTerms}
        handleSearchChange={handleSearchChange}
      />

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {products.length === 0 ? (
        <Alert variant="info">Нет продуктов в архиве</Alert>
      ) : (
        <>
          <ProductsTable
            products={products}
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

export default TrashProductsListAdmin;
