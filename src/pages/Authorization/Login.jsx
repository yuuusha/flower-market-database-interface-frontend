import React, { useState } from "react";
import { Card, Form, Container, Alert } from 'react-bootstrap';
import { PinkLink, PinkFormControl, PinkButton } from '../../styles/PinkUI';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const LoginSchema = Yup.object().shape({
  login: Yup.string().required('Обязательно'),
  password: Yup.string().min(4, 'Минимум 4 символа').required('Обязательно'),
});

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Авторизация</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Formik
          initialValues={{ login: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('/auth/login', values);
              const token = response.data.token;
              const decoded = jwtDecode(token);
              
              if (decoded.role === 'USER' || decoded.role === 'ADMIN') {
                localStorage.setItem('token', token);
                navigate('/clients');
              } else {
                setError('Недостаточно прав для доступа');
              }
            } catch (error) {
              setError(error.response?.data?.message || 'Ошибка авторизации');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="login">
                <Form.Label>Логин</Form.Label>
                <PinkFormControl
                  type="login"
                  name="login"
                  placeholder="Введите логин"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                  isInvalid={touched.login && !!errors.login}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.login}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Пароль</Form.Label>
                <PinkFormControl
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <PinkButton variant="pink" type="submit" className="mb-3" disabled={isSubmitting}>
                Войти
              </PinkButton>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default Login;
