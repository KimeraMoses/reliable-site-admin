import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TicketsByDeptId, AllTickets, TicketDetails, MyTickets } from './pages';
import './style.scss';

export const SupportTickets = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* Admin's Ticket List */}
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/support/tickets/list" />}
        />
        <Route path="tickets/list" element={<MyTickets />} />
        {/* Admin's Ticket List */}
        {/* Department's Tickets' */}
        <Route
          path="tickets/by-departments/:id"
          element={<TicketsByDeptId />}
        />
        <Route
          path="tickets/by-departments/:deptId/details/:id"
          element={<TicketDetails />}
        />
        {/* Departments Tickets */}
        {/* All Tickets */}
        <Route path="tickets/show-all/list" element={<AllTickets />} />
        <Route
          path="tickets/show-all/list/details/:id"
          element={<TicketDetails />}
        />
        {/* All Tickets */}
      </Routes>
    </DashboardLayout>
  );
};
