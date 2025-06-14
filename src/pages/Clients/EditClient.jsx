import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import EditClientFormComponent from '../../components/Clients/EditClientFormComponent';
import { useClient } from '../../context/ClientContext';
import useClientData from '../../hooks/useClients.js';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner.jsx';
import ErrorAlert from '../../components/Clients/ErrorAlertClientNotFound';
import { PinkButton } from '../../styles/PinkUI';

const EditClient = ({ isAdmin = false }) => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { client, setClient } = useClient();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleGenderChange,
    handleSubmit
  } = useClientData({ clientId, setClient, isAdmin });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор клиента или попробуйте еще раз." />;
  }

  const backLink = state?.fromTrash ? '/admin/clients/trash' : isAdmin ? `/admin/clients/${clientId}` : `/clients/${clientId}`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
          <h2 className="m-0">Изменить информацию о клиенте: {formData.lastName} {formData.firstName} {formData.middleName}</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => handleSubmit(e, navigate)}>
            <EditClientFormComponent
              formData={formData}
              handleChange={handleChange}
              handleGenderChange={handleGenderChange}
            />
            <div className="d-flex justify-content-between">
              <PinkButton variant="success" type="submit" className="px-4 py-2 rounded-pill">Сохранить изменения</PinkButton>
              <Button variant="secondary" as={Link} to={backLink} className="px-4 py-2 rounded-pill">Вернуться</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditClient;
