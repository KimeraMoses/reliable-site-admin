import { Route, Routes, Navigate } from 'react-router-dom';
import { Transactions } from './pages';

const Invoices = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to="/admin/dashboard/billing/invoices/transactions" />
        }
      />
      <Route path="transactions" element={<Transactions />} />
    </Routes>
  );
};

export default Invoices;
