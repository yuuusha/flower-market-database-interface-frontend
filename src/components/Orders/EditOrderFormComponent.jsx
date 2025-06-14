import React from 'react';
import { Form } from 'react-bootstrap';
import { PinkFormCheck, PinkFormControl } from '../../styles/PinkUI';

const EditOrderFormComponent = ({ formData, handleChange }) => {
  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label>Client ID</Form.Label>
        <PinkFormControl
          type="text"
          name="Client_id"
          value={formData.Client_id}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Enter Client ID"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Order Date</Form.Label>
        <PinkFormControl
          type="date"
          name="Order_date"
          value={formData.Order_date}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
        />
      </Form.Group>
    </>
  );
};

export default EditOrderFormComponent;
