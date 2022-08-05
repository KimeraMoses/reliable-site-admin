import { Route, Routes } from 'react-router-dom';
import { YourOrders } from './pages';
import { OTDetails, OrderTemplates } from './pages/OrderTemplates';
import { AddEditOrder } from './pages/AddEditOrder/AddEditOrder.page';

const Clients = () => {
  return (
    <Routes>
      <Route path="your-orders/list" element={<YourOrders />} />
      {/*  */}
      <Route path="your-orders/list/add/new" element={<AddEditOrder />} />
      <Route path="your-orders/list/edit/:id" element={<AddEditOrder />} />
      <Route path="order-templates/list" element={<OrderTemplates />} />
      <Route path="order-templates/list/add/new" element={<OTDetails />} />
      <Route path="order-templates/list/edit/:id" element={<OTDetails />} />
    </Routes>
  );
};

export default Clients;
