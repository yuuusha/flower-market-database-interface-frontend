import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import ProductDetailsComponent from '../../components/Products/ProductDetailsComponent';
import { useProduct } from '../../context/ProductContext';
import useProductData from '../../hooks/useProducts';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ErrorAlert from '../../components/Products/ErrorAlertProductNotFound';
import { PinkButton } from '../../styles/PinkUI';

const ProductDetails = ({ isAdmin = false }) => {
  const { productId } = useParams();
  const { state } = useLocation();
  const { product, setProduct } = useProduct();
  const { loading, error, relatedItems } = useProductData({ productId, setProduct });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор продукта или попробуйте еще раз." />;
  }

  if (!product) {
    return <ErrorAlert message="Продукт не найден." />;
  }

  const backLink = state?.fromTrash ? '/admin/products/trash' : isAdmin ? '/admin/products' : '/products';
  const notesLink = isAdmin ? `/admin/products/${productId}/notes` : `/products/${productId}/notes`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <ProductDetailsComponent product={product} relatedItems={relatedItems} loading={loading} error={error} />
        <Card.Body className="p-5 pt-0">
          <div className="d-flex justify-content-between flex-wrap">
            {!product.is_deleted && (
              <>
                <PinkButton
                  variant="success"
                  as={Link}
                  to={isAdmin ? `/admin/products/${productId}/edit` : `/products/${productId}/edit`}
                  className="px-4 py-2 rounded-pill mb-2"
                >
                  Изменить информацию
                </PinkButton>
              </>
            )}
            <Button variant="secondary" as={Link} to={backLink} className="px-4 py-2 rounded-pill mb-2">
              Вернуться
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
