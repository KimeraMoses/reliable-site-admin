import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  TicketList,
  TicketDetails,
  TicketsByDeptId,
  // TicketsByDepartment,
  // TicketsByDepartmentsDetails,
} from './pages';
import './style.scss';

export const SupportTickets = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/support/tickets/list" />}
        />
        <Route path="tickets/list" element={<TicketList />} />
        <Route path="tickets/list/details/:id" element={<TicketDetails />} />
        <Route
          path="tickets/by-departments/:id"
          element={<TicketsByDeptId />}
        />
        {/* <Route
          path="tickets/by-departments/details/:id"
          element={<TicketsByDepartmentsDetails />}
        /> */}
      </Routes>
    </DashboardLayout>
  );
};
