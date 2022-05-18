import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { pages } from './pages';

export function Settings() {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/settings/general" />}
        />
        {pages.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </DashboardLayout>
  );
}
