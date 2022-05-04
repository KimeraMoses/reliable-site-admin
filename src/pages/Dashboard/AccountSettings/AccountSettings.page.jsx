import { DashboardLayout } from 'layout';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function AccountSettings() {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          index
          element={<Navigate to="/admin/dashboard/account-settings/general" />}
        />
        <Route path="general" element={<>General</>} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </DashboardLayout>
  );
}
