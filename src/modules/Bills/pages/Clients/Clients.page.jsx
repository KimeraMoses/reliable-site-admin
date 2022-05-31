import { Route, Routes } from 'react-router-dom';
import { ClientList, ClientDetails } from './pages';

const Clients = () => {
  return (
    <Routes>
      <Route path="list/show" element={<ClientList />} />
      <Route path="list/details/:id" element={<ClientDetails />} />
    </Routes>
  );
};

export default Clients;
