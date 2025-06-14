import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import ClientDetailsComponent from '../../components/Clients/ClientDetailsComponent';
import { useClient } from '../../context/ClientContext';
import useClientData from '../../hooks/useClients';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ErrorAlert from '../../components/Clients/ErrorAlertClientNotFound';
import { PinkButton } from '../../styles/PinkUI';

const ClientDetails = ({ isAdmin = false }) => {
  const { clientId } = useParams();
  const { state } = useLocation();
  const { client, setClient } = useClient();
  const { loading, error } = useClientData({ clientId, setClient });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор клиента или попробуйте еще раз." />;
  }

  if (!client) {
    return <ErrorAlert message="Клиент не найден." />;
  }

  const backLink = state?.fromTrash ? '/admin/clients/trash' : isAdmin ? "/admin/clients" : "/clients";
  const notesLink = isAdmin ? `/admin/clients/${clientId}/notes` : `/clients/${clientId}/notes`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <ClientDetailsComponent client={client} />
        <Card.Body className="p-5 pt-0">
          <div className="d-flex justify-content-between flex-wrap">
            {!client.is_deleted && (
              <>
                <PinkButton
                  variant="success"
                  as={Link}
                  to={isAdmin ? `/admin/clients/${clientId}/edit` : `/clients/${clientId}/edit`}
                  className="px-4 py-2 rounded-pill mb-2"
                >
                  Изменить информацию
                </PinkButton>
              </>
            )}
            <Button
              variant="secondary"
              as={Link}
              to={backLink}
              className="px-4 py-2 rounded-pill mb-2"
            >
              Вернуться
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClientDetails;
