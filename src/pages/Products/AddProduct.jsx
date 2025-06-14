import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import AddProductFormComponent from '../../components/Products/AddProductFormComponent';
import useProductData from '../../hooks/useProducts'; // Используем правильный хук
import { PinkButton } from '../../styles/PinkUI';

const AddProduct = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { formData, error, handleChange, handleSubmit } = useProductData({ isForm: true });

  const onSubmit = async (e) => {
    const success = await handleSubmit(e, navigate);
    if (success) {
      navigate(isAdmin ? '/admin/products' : '/products');
    }
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
          <h2 className="m-0">Добавить новый продукт</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={onSubmit}>
            <AddProductFormComponent
              formData={formData}
              handleChange={handleChange}
            />
            <div className="d-flex justify-content-between">
              <PinkButton variant="success" type="submit" className="px-4 py-2 rounded-pill">Добавить продукт</PinkButton>
              <Button variant="secondary" as={Link} to={isAdmin ? '/admin/products' : '/products'} className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
