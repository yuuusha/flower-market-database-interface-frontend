import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import EditCashierFormComponent from '../../components/Cashiers/EditCashierFormComponent.jsx';
import { useCashier } from '../../context/CashierContext.jsx';
import useCashierData from '../../hooks/useCashiers.js';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner.jsx';
import ErrorAlert from '../../components/Cashiers/ErrorAlertCashierNotFound.jsx';
import { PinkButton } from '../../styles/PinkUI.js';

const EditCashier = ({ isAdmin = false }) => {
  const { cashierId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cashier, setCashier } = useCashier();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleGenderChange,
    handleSubmit
  } = useCashierData({ cashierId, setCashier, isAdmin });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор кассира или попробуйте еще раз." />;
  }

  const backLink = state?.fromTrash ? '/admin/cashiers/trash' : isAdmin ? `/admin/cashiers/${cashierId}` : `/cashiers/${cashierId}`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Header className="bg-pink text-white p-4 rounded-top text-center" style={{ backgroundColor: '#ff69b4' }}>
          <h2 className="m-0">Изменить информацию о кассире: {formData.Last_name} {formData.First_name} {formData.Middle_name}</h2>
        </Card.Header>
        <Card.Body className="p-5">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => handleSubmit(e, navigate)}>
            <EditCashierFormComponent
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

export default EditCashier;
