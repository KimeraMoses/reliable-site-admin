import React, { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import pages, { Error404, dashboardPages } from "pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { AutoAuthenticate, checkMultiFactorAuth, maintenanceStatus } from "store/Actions/AuthActions";
import "./App.scss";

const SignIn = React.lazy(() => import("pages/sign-in/SignIn.page"));
const SignUp = React.lazy(() => import("pages/sign-up/SignUp.page"));
const UnderMaintenance = React.lazy(() =>
  import("pages/under-maintenance/UnderMaintenance.page")
);

function App() {
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { maintenance, is2faEnabled } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    AutoAuthenticate(dispatch);
    dispatch(maintenanceStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkMultiFactorAuth(user && user.id));
  }, [user, dispatch]);

  return (
    <div className="App bg-custom-main flex items-center content-center">
      <ToastContainer />
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/sign-in" />} />
            <Route
              path="/under-maintenance"
              element={
                maintenance ? (
                  <UnderMaintenance />
                ) : isLoggedIn ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Navigate to="/admin/sign-in" />
                )
              }
            />
            <Route
              path="/admin/sign-in"
              element={
                maintenance ? (
                  <Navigate to="/under-maintenance" />
                ) : is2faEnabled ? (
                  <Navigate to="/admin/one-time-password" />
                ) : isLoggedIn ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route
              path="/admin/sign-up"
              element={
                isLoggedIn ? <Navigate to="/admin/dashboard" /> : <SignUp />
              }
            />
            <Route
              path="/admin"
              element={<Navigate replace to="/admin/dashboard" />}
            />
            {pages.map(({ path, Component }) => (
              <Route
                key={path}
                path={`/admin${path}`}
                element={<Component />}
                exact
              />
            ))}
            <Route path="/admin/dashboard">
              {dashboardPages.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={`/admin${path}`}
                  element={
                    !isLoggedIn ? (
                      <Navigate to="/admin/sign-in" />
                    ) : (
                      <Component />
                    )
                  }
                  exact
                />
              ))}
            </Route>
            <Route element={Error404} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
