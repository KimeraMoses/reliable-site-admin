import { DashboardLayout } from "layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getDepartments } from "store";
import { TicketsByDeptId, AllTickets, TicketDetails, MyTickets } from "./pages";
import { Queue } from "./pages/Queue/TicketDetails.page";
import "./style.scss";

export const SupportTickets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartments());
  }, []);
  return (
    <DashboardLayout>
      <Routes>
        {/* Admin's Ticket List */}
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/support/tickets/list" />}
        />
        <Route path="tickets/list" element={<MyTickets />} />
        <Route path="tickets/queue" element={<Queue />} />
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
