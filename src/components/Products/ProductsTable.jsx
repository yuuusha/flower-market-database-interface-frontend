import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProductsTable = ({ products, handleRowClick, handleDelete, handleUnDelete, isAdmin, isTrash }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Цена</th>
        {(isAdmin || isTrash) && <th>Действия</th>}
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr
          key={product.Product_id}
          onClick={() => handleRowClick(product.Product_id)}
          style={{ cursor: 'pointer' }}
        >
          <td>{index + 1}</td>
          <td>{product.Name}</td>
          <td>{product.Price}</td>
          {(isAdmin || isTrash) && (
            <td>
              {isTrash ? (
                <Button
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); handleUnDelete(product.Product_id); }}
                >
                  Вернуть из архива
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={(e) => { e.stopPropagation(); handleDelete(product.Product_id); }}
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

export default React.memo(ProductsTable);
