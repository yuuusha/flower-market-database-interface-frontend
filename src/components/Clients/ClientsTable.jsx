import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ClientsTable = ({ clients, handleRowClick, handleDelete, handleUnDelete, isAdmin, isTrash }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Email</th>
        <th>Дата рождения</th>
        <th>Номер телефона</th>
        <th>Адрес</th>
        <th>Скидка</th>
        {(isAdmin || isTrash) && <th>Действия</th>}
      </tr>
    </thead>
    <tbody>
      {clients.map((client, index) => (
        <tr
          key={client.Client_id}
          onClick={() => handleRowClick(client.Client_id)}
          style={{ cursor: 'pointer' }}
        >
          <td>{index + 1}</td>
          <td>{client.Last_name}</td>
          <td>{client.First_name}</td>
          <td>{client.Middle_name}</td>
          <td>{client.Email}</td>
          <td>{client.Date_of_birth}</td>
          <td>{client.Phone_number}</td>
          <td>{client.Client_address}</td>
          <td>{client.Discount}</td>
          {(isAdmin || isTrash) && (
            <td>
              {isTrash ? (
                <Button
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); handleUnDelete(client.Client_id); }}
                >
                  Вернуть из архива
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={(e) => { e.stopPropagation(); handleDelete(client.Client_id); }}
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

export default React.memo(ClientsTable);