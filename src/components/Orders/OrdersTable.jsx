import React from 'react';
import { Table, Button } from 'react-bootstrap';

const OrdersTable = ({ orders, handleRowClick, handleDelete, handleUnDelete, isAdmin, isTrash }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>ID клиента</th>
        <th>Дата заказа</th>
        {(isAdmin || isTrash) && <th>Действия</th>}
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => (
        <tr
          key={order.Client_id}
          onClick={() => handleRowClick(order.Client_id)}
          style={{ cursor: 'pointer' }}
        >
          <td>{index + 1}</td>
          <td>{order.Client_id}</td>
          <td>{order.Order_date}</td>
          {(isAdmin || isTrash) && (
            <td>
              {isTrash ? (
                <Button
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); handleUnDelete(order.Client_id); }}
                >
                  Вернуть из архива
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={(e) => { e.stopPropagation(); handleDelete(order.Client_id); }}
                >
                  Удалить
                </Button>
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default React.memo(OrdersTable);
