import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PinkButton = styled(Button)`
background-color: #ff69b4;
border-color: #ff69b4;
color: white;
padding: 10px 20px; /* Add padding */
border-radius: 0.5rem; /* Rounded corners */

& {
  color: white;
}

&:hover {
  background-color: #ff85c0;
  border-color: #ff85c0;
  color: white;
}

&:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 105, 180, 0.25);
  border-color: #ff69b4;
  color: white;
}

&:active {
  background-color: #ff579b;
  border-color: #ff579b;
  color: white;
}

&:disabled {
  background-color: #ffb0d4;
  border-color: #ffb0d4;
  color: white;
}
`;

export const PinkFormCheck = styled(Form.Check)`
  & .form-check-input:checked {
    background-color: #ff69b4;
    border-color: #ff69b4;
  }

  & .form-check-input:active {
    background-color: #ff579b;
    border-color: #ff579b;
  }

  & .form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 105, 180, 0.25);
    border-color: #ff69b4;
  }

  & .form-check-input {
    transform: scale(1.15); /* Увеличивает размер чекбоксов */
  }
`;

export const PinkLink = styled(Link)`
  & {
    color: white;
    text-decoration: none; /* Remove underline */
  }

  &:hover {
    text-decoration: none; /* Remove underline on hover */
  }
`;

export const PinkFormControl = styled(Form.Control)`
  border-radius: 0.5rem; /* Закругленные углы */
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 105, 180, 0.25);
    border-color: #ff69b4;
  }
`;

export const PinkFormSelect = styled(Form.Control)`
  border-radius: 0.5rem; /* Закругленные углы */
  padding-right: 2.5rem; /* Увеличивает пространство для стрелочки */
  background-position: calc(100% - 1rem) center; /* Перемещает стрелочку левее */
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 105, 180, 0.25);
    border-color: #ff69b4;
  }
  & option {
    border: none; /* Убирает черную рамку у опций */
  }

  & {
    border-color: #DEE2E6; 
  }
`;
