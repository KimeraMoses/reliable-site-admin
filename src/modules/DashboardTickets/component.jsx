import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TicketList, TicketDetails } from './pages';
import './style.scss';

const Tickets = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate to="/admin/dashboard/tickets/list/show" />
                    }
                />
                <Route path="list/show" element={<TicketList />} />
                <Route path="list/details/:id" element={<TicketDetails />} />
            </Routes>
        </DashboardLayout>
    );
};

export default Tickets;