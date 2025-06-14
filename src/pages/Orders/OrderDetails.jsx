import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import OrderDetailsComponent from '../../components/Orders/OrderDetailsComponent';
import { useOrder } from '../../context/OrderContext';
import useOrders from '../../hooks/useOrders';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ErrorAlert from '../../components/Orders/ErrorAlertOrderNotFound';
import { PinkButton } from '../../styles/PinkUI';

const OrderDetails = ({ isAdmin = false }) => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const { order, setOrder } = useOrder();
  const { loading, error } = useOrders({ orderId, setOrder });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор заказа или попробуйте еще раз." />;
  }

  if (!order) {
    return <ErrorAlert message="Заказ не найден." />;
  }

  const backLink = state?.fromTrash ? '/admin/orders/trash' : isAdmin ? "/admin/orders" : "/orders";
  const notesLink = isAdmin ? `/admin/orders/${orderId}/notes` : `/orders/${orderId}/notes`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <OrderDetailsComponent order={order} />
        <Card.Body className="p-5 pt-0">
          <div className="d-flex justify-content-between flex-wrap">
            {!order.is_deleted && (
              <>
                <PinkButton
                  variant="success"
                  as={Link}
                  to={isAdmin ? `/admin/orders/${orderId}/edit` : `/orders/${orderId}/edit`}
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

export default OrderDetails;
