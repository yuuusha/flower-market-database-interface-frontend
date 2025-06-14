import React from 'react';
import { Button, Container, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import useViews from '../../hooks/useViews';
import BouquetFlowerTable from './BouquetFlowerTable';
import ReceiptTable from './ReceiptTable';
import { PinkButton, PinkLink } from '../../styles/PinkUI';

const ViewsComponent = () => {
  const {
    data,
    loading,
    error,
    getBouquetFlowerView,
    getReceiptView
  } = useViews();

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <PinkButton variant="primary" onClick={getBouquetFlowerView}>Букеты и цветы</PinkButton>
        </Col>
        <Col>
          <PinkButton variant="primary" onClick={getReceiptView}>Чеки</PinkButton>
        </Col>
      </Row>
      {loading && (
        <Row className="mt-4">
          <Col className="text-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      )}
      {error && (
        <Row className="mt-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
      {data && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                {Array.isArray(data) && data.length && data[0].bouquet !== undefined ? (
                  <BouquetFlowerTable data={data} />
                ) : (
                  <ReceiptTable data={data} />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ViewsComponent;
