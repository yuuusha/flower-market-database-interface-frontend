import React from 'react';
import { Form } from 'react-bootstrap';
import { PinkFormControl } from '../../styles/PinkUI';

const OrderSearchForm = ({ searchTerms, handleSearchChange }) => (
  <Form className="mb-3">
    <PinkFormControl
      type="text"
      placeholder="Поиск по ID клиента..."
      name="Client_id"
      value={searchTerms.Client_id}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <PinkFormControl
      type="text"
      placeholder="Поиск по дате заказа..."
      name="Order_date"
      value={searchTerms.Order_date}
      onChange={handleSearchChange}
      className="mb-2"
    />
  </Form>
);

export default React.memo(OrderSearchForm);
