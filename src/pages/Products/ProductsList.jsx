import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import ProductSearchForm from '../../components/Products/ProductSearchForm';
import ProductsTable from '../../components/Products/ProductsTable';
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

const ProductsList = ({ buttonName, buttonLink, isAdmin = false }) => {
  const {
    products,
    searchTerms,
    setSearchTerms,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteProduct,
    loading,
    error
  } = useProducts({ isAdmin });

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const handleRowClick = (productId) => {
    navigate(isAdmin ? `/admin/products/${productId}` : `/products/${productId}`);
  };

  const filterProducts = (typeId) => {
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      Type_id: typeId
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <PinkButton variant="outline-primary" onClick={() => filterProducts('2')}>Показать только букеты</PinkButton>
        <PinkButton variant="outline-primary" onClick={() => filterProducts('1')}>Показать только цветы</PinkButton>
        <PinkButton variant="outline-primary" onClick={() => filterProducts('3')}>Показать только доп.товары</PinkButton>
        <PinkButton variant="outline-primary" onClick={() => filterProducts('')}>Показать все</PinkButton>
      </div>
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
        <Alert variant="info">Нет продуктов</Alert>
      ) : (
        <>
          <ProductsTable 
            products={products} 
            handleRowClick={handleRowClick} 
            handleDelete={handleDeleteProduct} 
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

export default ProductsList;
