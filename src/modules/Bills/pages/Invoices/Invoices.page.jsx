import { Route, Routes, Navigate } from 'react-router-dom';
import { InvoiceList, InvoiceDetails } from './pages';

const Invoices = () => {
  return (
    <Routes>
       <Route
        path="/"
        element={
          <Navigate to="/admin/dashboard/billing/invoices/list/show" />
        }
      />
      <Route path="list/show" element={<InvoiceList />} />
      <Route path="list/details/:id" element={<InvoiceDetails />} />
    </Routes>
  );
};

export default Invoices;
