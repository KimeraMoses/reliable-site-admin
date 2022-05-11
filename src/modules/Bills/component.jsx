import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { pages } from './pages';
import './style.scss';

export function Bills() {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/billing/orders" />}
        />
        <Route
          path="clients"
          element={<Navigate to="/admin/dashboard/billing/clients/list/show" />}
        />
        {pages?.map(({ path, Component }) => {
          return <Route path={path} element={<Component />} />;
        })}
      </Routes>
    </DashboardLayout>
  );
}
