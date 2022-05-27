import { DashboardLayout } from 'layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getBillingSettingsByTenant } from 'store';
import { getAppSettingsByTenant } from 'store';
import { pages } from './pages';

export function Settings() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppSettingsByTenant());
    dispatch(getBillingSettingsByTenant());
  }, []);

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
