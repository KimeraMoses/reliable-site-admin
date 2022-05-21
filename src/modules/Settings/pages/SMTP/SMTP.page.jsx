import { Navigate, Route, Routes } from 'react-router-dom';
import { List, AddConfiguration, EditConfiguration } from './pages';

function SMTP() {
  return (
    <Routes>
      <Route
        index
        element={
          <Navigate to="/admin/dashboard/settings/smtp/configuration/add" />
        }
      />
      {/* <Route index element={<List />} /> */}
      <Route path="configuration/add" element={<AddConfiguration />} />
      <Route path="edit/:id" element={<EditConfiguration />} />
    </Routes>
  );
}

export default SMTP;
