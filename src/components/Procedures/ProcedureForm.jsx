import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { PinkButton, PinkLink } from '../../styles/PinkUI';

const ProcedureForm = ({ onSubmit, procedureName, fields }) => {
  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(Object.values(formValues));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h5>{procedureName}</h5>
      {fields.map((field, idx) => (
        <Form.Group key={idx} as={Row} className="mb-3">
          <Form.Label column sm="4">{field.label}</Form.Label>
          <Col sm="8">
            <Form.Control
              type={field.type}
              name={field.name}
              value={formValues[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          </Col>
        </Form.Group>
      ))}
      <PinkButton variant="primary" type="submit">Выполнить</PinkButton>
    </Form>
  );
};

export default ProcedureForm;
