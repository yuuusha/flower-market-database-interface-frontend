import React from 'react';
import { Table } from 'react-bootstrap';

const TopEarningCashierResult = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Кассир</th>
          <th>Общие доходы</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.TopEarningCashier}</td>
          <td>{data.TotalEarnings.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TopEarningCashierResult;
