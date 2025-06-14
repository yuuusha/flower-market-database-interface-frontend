import React from 'react';
import { Form } from 'react-bootstrap';
import { PinkFormCheck, PinkFormControl } from '../../styles/PinkUI.js';

const AddCashierFormComponent = ({ formData, handleChange, handleGenderChange }) => {
  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label>Имя</Form.Label>
        <PinkFormControl
          type="text"
          name="First_name"
          value={formData.First_name}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите имя"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Фамилия</Form.Label>
        <PinkFormControl
          type="text"
          name="Last_name"
          value={formData.Last_name}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите фамилию"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Отчество</Form.Label>
        <PinkFormControl
          type="text"
          name="Middle_name"
          value={formData.Middle_name}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите отчество"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Дата рождения</Form.Label>
        <PinkFormControl
          type="date"
          name="Date_of_birth"
          value={formData.Date_of_birth}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Номер телефона</Form.Label>
        <PinkFormControl
          type="tel"
          name="Phone_number"
          value={formData.Phone_number}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите номер телефона"
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Опыт работы</Form.Label>
        <PinkFormControl
          type="text"
          name="Experience"
          value={formData.Experience}
          onChange={handleChange}
          required
          className="form-control-lg rounded-pill"
          placeholder="Введите опыт работы"
        />
      </Form.Group>
    </>
  );
};

export default AddCashierFormComponent;
