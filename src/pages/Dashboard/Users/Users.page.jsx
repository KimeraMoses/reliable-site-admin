import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersList, UsersGroups } from './subpages';
import './Users.styles.scss';

function Users() {
  return (
    <DashboardLayout>
      <div className="users">
        <div className="users__inner">
          <Routes>
            {/* TODO: Change to /users/list */}
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard/users/groups" />}
            />
            <Route path="list" element={<UsersList />} />
            <Route path="groups" element={<UsersGroups />} />
          </Routes>
        </div>
      </div>
    </DashboardLayout>
  );
}
export default Users;
