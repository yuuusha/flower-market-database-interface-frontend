import React from 'react';
import TablePage from './components/UIComponents/TablePage';
import ClientsList from './pages/Clients/ClientsList';
import AddClient from './pages/Clients/AddClient';
import TrashClientsListAdmin from './pages/Clients/TrashClientsListAdmin';
import UsersListAdmin from './pages/Users/UsersList';
import ClientDetails from './pages/Clients/ClientDetails';
import EditClient from './pages/Clients/EditClient';
import ProtectedRouteWithRole from './components/UtilComponents/ProtectedRouteWithRole';
import NotFound from './pages/UtilPages/NotFound';
import NewNote from './pages/Journal/NewNote';
import CashiersList from './pages/Cashiers/CashiersList';
import AddCashier from './pages/Cashiers/AddCashier';
import TrashCashiersListAdmin from './pages/Cashiers/TrashCashiersListAdmin';
import CashierDetails from './pages/Cashiers/CashierDetails';
import EditCashier from './pages/Cashiers/EditCashier';
import ProductsList from './pages/Products/ProductsList';
import AddProduct from './pages/Products/AddProduct';
import TrashProductsListAdmin from './pages/Products/TrashProductsListAdmin';
import ProductDetails from './pages/Products/ProductDetails';
import EditProduct from './pages/Products/EditProduct';
import OrdersList from './pages/Orders/OrdersList';
import AddOrder from './pages/Orders/AddOrder';
import TrashOrdersListAdmin from './pages/Orders/TrashOrdersListAdmin';
import OrderDetails from './pages/Orders/OrderDetails';
import EditOrder from './pages/Orders/EditOrder';
import ProceduresPage from './pages/Procedures/Procedures';
import ViewsPage from './pages/Views/Views';

export const routesConfig = () => {
  return [
    {
      path: "/clients",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список клиентов"
            buttonName="Добавить нового клиента"
            buttonLink="/new-client"
            ListComponent={(props) => <ClientsList {...props} isAdmin={false} />}
          />
        } allowedRoles={["USER", "ADMIN"]} />
      ),
    },
    { path: "/admin/new-client", element: <ProtectedRouteWithRole element={<AddClient isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/new-client", element: <ProtectedRouteWithRole element={<AddClient isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    {
      path: "/admin/clients",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список клиентов"
            buttonName="Добавить нового клиента"
            buttonLink="/admin/new-client"
            ListComponent={(props) => <ClientsList {...props} isAdmin={true} />}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    {
      path: "/admin/clients/trash",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список клиентов в архиве"
            ListComponent={TrashClientsListAdmin}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    { path: "/admin/clients/:clientId", element: <ProtectedRouteWithRole element={<ClientDetails isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/admin/clients/:clientId/edit", element: <ProtectedRouteWithRole element={<EditClient isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/clients/:clientId", element: <ProtectedRouteWithRole element={<ClientDetails isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/clients/:clientId/edit", element: <ProtectedRouteWithRole element={<EditClient isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/admin/clients/:clientId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/clients/:clientId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "*", element: <NotFound /> },

    {
      path: "/cashiers",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список кассиров"
            buttonName="Добавить нового кассира"
            buttonLink="/new-cashier"
            ListComponent={(props) => <CashiersList {...props} isAdmin={false} />}
          />
        } allowedRoles={["USER", "ADMIN"]} />
      ),
    },
    { path: "/admin/new-cashier", element: <ProtectedRouteWithRole element={<AddCashier isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/new-cashier", element: <ProtectedRouteWithRole element={<AddCashier isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    {
      path: "/admin/cashiers",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список кассиров"
            buttonName="Добавить нового кассира"
            buttonLink="/admin/new-cashier"
            ListComponent={(props) => <CashiersList {...props} isAdmin={true} />}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    {
      path: "/admin/cashiers/trash",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список кассиров в архиве"
            ListComponent={TrashCashiersListAdmin}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    { path: "/admin/cashiers/:cashierId", element: <ProtectedRouteWithRole element={<CashierDetails isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/admin/cashiers/:cashierId/edit", element: <ProtectedRouteWithRole element={<EditCashier isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/cashiers/:cashierId", element: <ProtectedRouteWithRole element={<CashierDetails isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/cashiers/:cashierId/edit", element: <ProtectedRouteWithRole element={<EditCashier isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/admin/cashiers/:cashierId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/cashiers/:cashierId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "*", element: <NotFound /> },

    {
      path: "/products",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список продуктов"
            buttonName="Добавить новый продукт"
            buttonLink="/new-product"
            ListComponent={(props) => <ProductsList {...props} isAdmin={false} />}
          />
        } allowedRoles={["USER", "ADMIN"]} />
      ),
    },
    { path: "/admin/new-product", element: <ProtectedRouteWithRole element={<AddProduct isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/new-product", element: <ProtectedRouteWithRole element={<AddProduct isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    {
      path: "/admin/products",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список продуктов"
            buttonName="Добавить новый продукт"
            buttonLink="/admin/new-product"
            ListComponent={(props) => <ProductsList {...props} isAdmin={true} />}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    {
      path: "/admin/products/trash",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список продуктов в архиве"
            ListComponent={TrashProductsListAdmin}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    { path: "/admin/products/:productId", element: <ProtectedRouteWithRole element={<ProductDetails isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/admin/products/:productId/edit", element: <ProtectedRouteWithRole element={<EditProduct isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/products/:productId", element: <ProtectedRouteWithRole element={<ProductDetails isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/products/:productId/edit", element: <ProtectedRouteWithRole element={<EditProduct isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/admin/products/:productId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/products/:productId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "*", element: <NotFound /> },

    {
      path: "/orders",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список заказов"
            buttonName="Добавить новый заказ"
            buttonLink="/new-order"
            ListComponent={(props) => <OrdersList {...props} isAdmin={false} />}
          />
        } allowedRoles={["USER", "ADMIN"]} />
      ),
    },
    { path: "/admin/new-order", element: <ProtectedRouteWithRole element={<AddOrder isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/new-order", element: <ProtectedRouteWithRole element={<AddOrder isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    {
      path: "/admin/orders",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список заказов"
            buttonName="Добавить новый заказ"
            buttonLink="/admin/new-order"
            ListComponent={(props) => <OrdersList {...props} isAdmin={true} />}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    {
      path: "/admin/orders/trash",
      element: (
        <ProtectedRouteWithRole element={
          <TablePage
            titleName="Список заказов в архиве"
            ListComponent={TrashOrdersListAdmin}
          />
        } allowedRoles={["ADMIN"]} />
      ),
    },
    { path: "/admin/orders/:orderId", element: <ProtectedRouteWithRole element={<OrderDetails isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/admin/orders/:orderId/edit", element: <ProtectedRouteWithRole element={<EditOrder isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/orders/:orderId", element: <ProtectedRouteWithRole element={<OrderDetails isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/orders/:orderId/edit", element: <ProtectedRouteWithRole element={<EditOrder isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "/admin/orders/:orderId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={true} />} allowedRoles={["ADMIN"]} /> },
    { path: "/orders/:orderId/new-note", element: <ProtectedRouteWithRole element={<NewNote isAdmin={false} />} allowedRoles={["USER", "ADMIN"]} /> },
    { path: "*", element: <NotFound /> },

    {
      path: "/procedures",
      element: <ProceduresPage />,
    },

    {
      path: "/procedures",
      element: (
        <ProtectedRouteWithRole element={<ProceduresPage />} allowedRoles={["USER", "ADMIN"]} />
      ),
    },
    {
      path: "/views",
      element: (
        <ProtectedRouteWithRole element={<ViewsPage />} allowedRoles={["USER", "ADMIN"]} />
      ),
    },
    { path: "*", element: <NotFound /> },

    {
      path: "/orders/:orderId",
      element: (
        <ProtectedRouteWithRole element={<OrderDetails />} allowedRoles={["USER", "ADMIN"]} />
      ),
    },

    {
      path: "/products/:productId",
      element: (
        <ProtectedRouteWithRole element={<ProductDetails />} allowedRoles={["USER", "ADMIN"]} />
      ),
    },
    
  ];
};
