import React from 'react';
import { Table } from 'react-bootstrap';

const OrderCountResult = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Количество заказов</th>
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

export default OrderCountResult;
