import React from 'react';
import { Table } from 'react-bootstrap';

const OrderAmountResult = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Сумма заказа</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default OrderAmountResult;
