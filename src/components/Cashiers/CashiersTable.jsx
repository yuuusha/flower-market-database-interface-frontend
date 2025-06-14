import React from 'react';
import { Table, Button } from 'react-bootstrap';

const CashiersTable = ({ cashiers, handleRowClick, handleDelete, handleUnDelete, isAdmin, isTrash }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Дата рождения</th>
        <th>Номер телефона</th>
        <th>Опыт работы</th>
        {(isAdmin || isTrash) && <th>Действия</th>}
      </tr>
    </thead>
    <tbody>
      {cashiers.map((cashier, index) => (
        <tr
          key={cashier.Cashier_id}
          onClick={() => handleRowClick(cashier.Cashier_id)}
          style={{ cursor: 'pointer' }}
        >
          <td>{index + 1}</td>
          <td>{cashier.Last_name}</td>
          <td>{cashier.First_name}</td>
          <td>{cashier.Middle_name}</td>
          <td>{cashier.Date_of_birth}</td>
          <td>{cashier.Phone_number}</td>
          <td>{cashier.Experience}</td>
          {(isAdmin || isTrash) && (
            <td>
              {isTrash ? (
                <Button
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); handleUnDelete(cashier.Cashier_id); }}
                >
                  Вернуть из архива
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={(e) => { e.stopPropagation(); handleDelete(cashier.Cashier_id); }}
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

export default React.memo(CashiersTable);
