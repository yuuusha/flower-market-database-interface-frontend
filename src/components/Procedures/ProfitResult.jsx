import React from 'react';
import { Table } from 'react-bootstrap';

const ProfitResult = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Прибыль</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ProfitResult;
