import React from 'react';
import { Table } from 'react-bootstrap';

const BouquetFlowerTable = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Букет</th>
          <th>Цветок</th>
          <th>Количество</th>
          <th>Цена букета</th>
          <th>Цена цветка</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.bouquet}</td>
            <td>{item.flower}</td>
            <td>{item.quantity}</td>
            <td>{item.bouquetPrice.toFixed(2)}</td>
            <td>{item.flowerPrice.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BouquetFlowerTable;
