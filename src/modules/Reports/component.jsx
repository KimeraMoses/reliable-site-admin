import { DashboardLayout } from 'layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnnualIncomeReport, SupportResponseTime } from './pages';

export const Reports = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          index
          element={<Navigate to="/admin/dashboard/reports/anuual/income" />}
        />
        <Route path="anuual/income" element={<AnnualIncomeReport />} />
        <Route path="support-response/time" element={<SupportResponseTime />} />
      </Routes>
    </DashboardLayout>
  );
};
