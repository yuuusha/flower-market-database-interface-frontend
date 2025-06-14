import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';

export const PinkNavDropdownItem = styled(NavDropdown.Item)`
  &.dropdown-item {
    color: black;
  }

  &.dropdown-item:hover,
  &.dropdown-item:focus,
  &.dropdown-item:active {
    background-color: #ff69b4;
    color: white;
  }
`;