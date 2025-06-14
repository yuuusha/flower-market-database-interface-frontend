import React from 'react';
import { Table } from 'react-bootstrap';

const ClientSalesResult = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Client ID</th>
          <th>Total Sales</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sale, index) => (
          <tr key={index}>
            <td>{sale.ClientId}</td>
            <td>{sale.TotalSales.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientSalesResult;
