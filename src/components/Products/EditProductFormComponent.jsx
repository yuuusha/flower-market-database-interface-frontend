import React from 'react';
import { Form } from 'react-bootstrap';
import { PinkFormCheck, PinkFormControl } from '../../styles/PinkUI';

const EditProductFormComponent = ({ formData, handleChange }) => {
  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label>Тип ID</Form.Label>
        <PinkFormControl
          type="text"
          name="Type_id"
          value={formData.Type_id}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите Тип ID"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Название</Form.Label>
        <PinkFormControl
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите название"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Цена</Form.Label>
        <PinkFormControl
          type="text"
          name="Price"
          value={formData.Price}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите цену"
        />
      </Form.Group>
    </>
  );
};

export default EditProductFormComponent;
