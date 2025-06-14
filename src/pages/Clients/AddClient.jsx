import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import AddClientFormComponent from '../../components/Clients/AddClientFormComponent';
import useClientData from '../../hooks/useClients'; // Используем правильный хук
import { PinkButton } from '../../styles/PinkUI';

const AddClient = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { formData, error, handleChange, handleGenderChange, handleSubmit } = useClientData({ isForm: true });

  const onSubmit = async (e) => {
    const success = await handleSubmit(e, navigate);
    if (success) {
      navigate(isAdmin ? '/admin/clients' : '/clients');
    }
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
          <h2 className="m-0">Добавить нового клиента</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={onSubmit}>
            <AddClientFormComponent
              formData={formData}
              handleChange={handleChange}
              handleGenderChange={handleGenderChange}
            />
            <div className="d-flex justify-content-between">
              <PinkButton variant="success" type="submit" className="px-4 py-2 rounded-pill">Добавить клиента</PinkButton>
              <Button variant="secondary" as={Link} to={isAdmin ? '/admin/clients' : '/clients'} className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddClient;
