import { Route, Routes } from 'react-router-dom';
import { ClientList, ClientDetails, MassEmailClients } from './pages';

const Clients = () => {
  return (
    <Routes>
      <Route path="list/show" element={<ClientList />} />
      <Route path="list/details/:id" element={<ClientDetails />} />
      <Route
        path="send-email/mass-email-clients"
        element={<MassEmailClients />}
      />
    </Routes>
  );
};

export default Clients;
