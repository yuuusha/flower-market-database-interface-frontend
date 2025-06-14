import React from 'react';
import { Table } from 'react-bootstrap';

const ActiveOrdersResult = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Client ID</th>
          <th>Order Date</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.Order_id}>
            <td>{order.Order_id}</td>
            <td>{order.Client_id}</td>
            <td>{order.Order_date}</td>
            <td>{order.Order_status ? 'Completed' : 'Active'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ActiveOrdersResult;
