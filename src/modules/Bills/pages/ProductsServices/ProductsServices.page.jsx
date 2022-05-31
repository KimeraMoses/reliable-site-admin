import { Route, Routes, Navigate } from 'react-router-dom';
import { PSList, PSDetails } from './pages';

const ProductsServices = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to="/admin/dashboard/billing/products-services/list/show" />
        }
      />
      <Route path="list/show" element={<PSList />} />
      <Route path="list/details/:id" element={<PSDetails />} />
    </Routes>
  );
};

export default ProductsServices;
