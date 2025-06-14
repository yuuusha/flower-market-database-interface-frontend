import React from 'react';
import { Form } from 'react-bootstrap';
import { PinkFormControl } from '../../styles/PinkUI';

const ProductSearchForm = ({ searchTerms, handleSearchChange }) => (
  <Form className="mb-3">
    <PinkFormControl
      type="text"
      placeholder="Поиск по названию..."
      name="Name"
      value={searchTerms.Name}
      onChange={handleSearchChange}
      className="mb-2"
    />
  </Form>
);

export default React.memo(ProductSearchForm);
