import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import CashierDetailsComponent from '../../components/Cashiers/CashierDetailsComponent';
import { useCashier } from '../../context/CashierContext';
import useCashierData from '../../hooks/useCashiers';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ErrorAlert from '../../components/Cashiers/ErrorAlertCashierNotFound';
import { PinkButton } from '../../styles/PinkUI';

const CashierDetails = ({ isAdmin = false }) => {
  const { cashierId } = useParams();
  const { state } = useLocation();
  const { cashier, setCashier } = useCashier();
  const { loading, error } = useCashierData({ cashierId, setCashier });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор кассира или попробуйте еще раз." />;
  }

  if (!cashier) {
    return <ErrorAlert message="Кассир не найден." />;
  }

  const backLink = state?.fromTrash ? '/admin/cashiers/trash' : isAdmin ? "/admin/cashiers" : "/cashiers";
  const notesLink = isAdmin ? `/admin/cashiers/${cashierId}/notes` : `/cashiers/${cashierId}/notes`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <CashierDetailsComponent cashier={cashier} />
        <Card.Body className="p-5 pt-0">
          <div className="d-flex justify-content-between flex-wrap">
            {!cashier.is_deleted && (
              <>
                <PinkButton
                  variant="success"
                  as={Link}
                  to={isAdmin ? `/admin/cashiers/${cashierId}/edit` : `/cashiers/${cashierId}/edit`}
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

export default CashierDetails;
