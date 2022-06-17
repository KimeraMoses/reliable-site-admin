import { Route, Routes } from 'react-router-dom';
import { YourOrders, AllOrders } from './pages';

const Clients = () => {
  return (
    <Routes>
      <Route path="your-orders/list" element={<YourOrders />} />
      <Route path="all-orders/list" element={<AllOrders />} />
    </Routes>
  );
};

export default Clients;