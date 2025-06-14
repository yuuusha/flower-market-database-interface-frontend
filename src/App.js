import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClientProvider } from './context/ClientContext';
import { CashierProvider } from './context/CashierContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { routesConfig } from './routesConfig';
import Layout from './components/UIComponents/Layout';
import NotFound from './pages/UtilPages/NotFound';
import Login from './pages/Authorization/Login';
import HomePage from './pages/UtilPages/HomePage';
import ForbiddenPage from './pages/UtilPages/ForbiddenPage';
import AuthRedirectRoute from './components/UtilComponents/AuthRedirectRoute';

const App = () => {
  const routes = routesConfig();

  return (
    <BrowserRouter>
      <ClientProvider>
        <CashierProvider>
          <ProductProvider>
            <OrderProvider>
              <Routes>
                <Route path="/login" element={<AuthRedirectRoute element={<Login />} />} />
                <Route path="/forbidden" element={<ForbiddenPage />} />

                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />

                  {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                  ))}

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </OrderProvider>
          </ProductProvider>
        </CashierProvider>
      </ClientProvider>
    </BrowserRouter>
  );
};

export default App;
