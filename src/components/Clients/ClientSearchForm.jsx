import React from 'react';
import { Form } from 'react-bootstrap';
import { PinkFormControl } from '../../styles/PinkUI';

const ClientSearchForm = ({ searchTerms, handleSearchChange }) => (
  <Form className="mb-3">
    <PinkFormControl
      type="text"
      placeholder="Поиск по фамилии..."
      name="Last_name"
      value={searchTerms.Last_name}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <PinkFormControl
      type="text"
      placeholder="Поиск по имени..."
      name="First_name"
      value={searchTerms.First_name}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <PinkFormControl
      type="text"
      placeholder="Поиск по отчеству..."
      name="Middle_name"
      value={searchTerms.Middle_name}
      onChange={handleSearchChange}
      className="mb-2"
    />
    <PinkFormControl
      type="text"
      placeholder="Поиск по дате рождения..."
      name="Date_of_birth"
      value={searchTerms.Date_of_birth}
      onChange={handleSearchChange}
      className="mb-2"
    />
  </Form>
);

export default React.memo(ClientSearchForm);
