import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TicketList, TicketDetails } from './pages';
import './style.scss';

export const SupportTickets = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/support/tickets" />}
        />
        <Route path="tickets" element={<TicketList />} />
        <Route path="tickets/details/:id" element={<TicketDetails />} />
      </Routes>
    </DashboardLayout>
  );
};
