import React from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import ProcedureForm from '../../components/Procedures/ProcedureForm';
import useProcedures from '../../hooks/useProcedures';
import TopEarningCashierResult from '../../components/Procedures/TopEarningCashierResult';
import ProfitResult from '../../components/Procedures/ProfitResult';
import OrderCountResult from '../../components/Procedures/OrderCountResult';
import ClientSalesResult from '../../components/Procedures/ClientSalesResult';
import ActiveOrdersResult from '../../components/Procedures/ActiveOrdersResult';
import OrderAmountResult from '../../components/Procedures/OrderAmountResult';

const ProceduresPage = () => {
  const {
    data,
    loading,
    error,
    handleProcedure,
    getTopEarningCashier,
    getProfit,
    getOrderCount,
    getClientSales,
    getActiveOrders,
    getAmountByOrder
  } = useProcedures();

  const procedureForms = [
    {
      name: 'Получить лучшего кассира',
      procedure: getTopEarningCashier,
      fields: [
        { name: 'startDate', label: 'Дата начала', type: 'date', required: true },
        { name: 'endDate', label: 'Дата окончания', type: 'date', required: true }
        // {
        //   name: 'mode',
        //   label: 'Режим',
        //   type: 'select',
        //   required: true,
        //   options: [
        //     { value: 0, label: '0 - по количеству товаров' },
        //     { value: 1, label: '1 - по сумме продаж' }
        //   ]
        // }
      ]
    },
    {
      name: 'Получить прибыль',
      procedure: getProfit,
      fields: [
        { name: 'startDate', label: 'Дата начала', type: 'date', required: true },
        { name: 'endDate', label: 'Дата окончания', type: 'date', required: true }
      ]
    },
    {
      name: 'Получить количество заказов',
      procedure: getOrderCount,
      fields: [
        { name: 'startDate', label: 'Дата начала', type: 'date', required: true },
        { name: 'endDate', label: 'Дата окончания', type: 'date', required: true }
      ]
    },
    {
      name: 'Получить продажи клиентов',
      procedure: getClientSales,
      fields: [
        { name: 'startDate', label: 'Дата начала', type: 'date', required: true },
        { name: 'endDate', label: 'Дата окончания', type: 'date', required: true }
      ]
    },
    {
      name: 'Получить активные заказы',
      procedure: getActiveOrders,
      fields: []
    },
    {
      name: 'Получить сумму по заказу',
      procedure: getAmountByOrder,
      fields: [
        { name: 'orderId', label: 'ID заказа', type: 'number', required: true }
      ]
    }
  ];

  const renderResult = () => {
    if (!data) return null;

    if (data.TopEarningCashier) return <TopEarningCashierResult data={data} />;
    if (typeof data === 'number' && data !== 0) return <ProfitResult data={data} />;
    if (typeof data === 'number') return <OrderCountResult data={data} />;
    if (Array.isArray(data) && data.length && data[0].ClientId !== undefined) return <ClientSalesResult data={data} />;
    if (Array.isArray(data) && data.length && data[0].Order_id !== undefined) return <ActiveOrdersResult data={data} />;
    if (typeof data === 'number') return <OrderAmountResult data={data} />;

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  };

  return (
    <Container className="mt-5">
      <Row>
        {procedureForms.map((form, idx) => (
          <Col key={idx} md={6} className="mb-4">
            <Card>
              <Card.Body>
                <ProcedureForm
                  onSubmit={(params) => handleProcedure(form.procedure, params)}
                  procedureName={form.name}
                  fields={form.fields}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
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
                {renderResult()}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProceduresPage;
