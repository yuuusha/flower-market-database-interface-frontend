import React from 'react';
import { Table } from 'react-bootstrap';

const ReceiptTable = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Cashier ID</th>
          <th>Кассир</th>
          <th>Клиент</th>
          <th>Дата заказа</th>
          <th>Дата выдачи</th>
          <th>Продукт</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Order_id}</td>
            <td>{item.Cashier_id}</td>
            <td>{item.Cashier}</td>
            <td>{item.Client}</td>
            <td>{item.Order_date}</td>
            <td>{item.Issue_date}</td>
            <td>{item.Product}</td>
            <td>{item.Price.toFixed(2)}</td>
            <td>{item.Quantity}</td>
            <td>{item.Amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReceiptTable;
