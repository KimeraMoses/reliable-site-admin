import React, { Suspense, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import IdleTimer from 'react-idle-timer';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import pages, { Error404, dashboardPages } from 'pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AutoAuthenticate, maintenanceStatus } from 'store/Actions/AuthActions';
import { getAppModules, getUserModules } from 'store/Actions/moduleActions';
import { initiateLockScreen } from 'store/Slices/settingSlice';

const SignIn = React.lazy(() => import('pages/sign-in/SignIn.page'));
const SignUp = React.lazy(() => import('pages/sign-up/SignUp.page'));
const ResetPassword = React.lazy(() =>
  import('pages/reset-password/ResetPassword.page')
);
const ForgotPassword = React.lazy(() =>
  import('pages/forgot-password/ForgotPassword.page')
);
const EmailVerification = React.lazy(() =>
  import('pages/email-verification/EmailVerification.page')
);
const ConfirmOtp = React.lazy(() =>
  import('pages/one-time-password/OneTimePassword.page')
);
const UnderMaintenance = React.lazy(() =>
  import('pages/under-maintenance/UnderMaintenance.page')
);
const SuspendedAccount = React.lazy(() =>
  import('pages/account-suspended/AccountSuspended.page')
);
const LockScreen = React.lazy(() =>
  import('pages/lock-screen/LockScreen.page')
);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { maintenance, suspended } = useSelector((state) => state.settings);
  const isIdle = useSelector((state) => state.settings.isIdle);
  const Timeout = 1000 * 900;
  const idleTimer = useRef(null);

  const OnIdle = () => {
    dispatch(initiateLockScreen());
  };

  const dispatch = useDispatch();
  useEffect(() => {
    AutoAuthenticate(dispatch);
    dispatch(maintenanceStatus());
    dispatch(getAppModules());
    dispatch(getUserModules());
    // dispatch(trustedDays())
  }, [dispatch]);

  return (
    <div className="App bg-custom-main flex items-center content-center">
      <IdleTimer ref={idleTimer} onIdle={OnIdle} timeout={Timeout} />
      <ToastContainer />
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/sign-in" />} />
            <Route
              path="/admin/sign-up"
              element={
                !isLoggedIn ? <SignUp /> : <Navigate to="/admin/sign-in" />
              }
            />
            <Route
              path="/admin/lock-screen"
              element={isIdle ? <LockScreen /> : <Navigate to={-1} />}
            />
            <Route path="/admin" element={<Navigate to="/admin/sign-in" />} />
            <Route
              path="/admin/account-suspended"
              element={
                !suspended ? (
                  <Navigate to="/admin/sign-in" />
                ) : (
                  <SuspendedAccount />
                )
              }
            />
            <Route
              path="/admin/verify-email/:userId"
              element={
                suspended ? (
                  <Navigate to="/admin/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <EmailVerification />
                )
              }
            />
            <Route
              path="/admin/reset-password"
              element={
                suspended ? (
                  <Navigate to="/admin/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <ResetPassword />
                )
              }
            />
            <Route
              path="/admin/forgot-password"
              element={
                suspended ? (
                  <Navigate to="/admin/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <ForgotPassword />
                )
              }
            />
            <Route
              path="/admin/one-time-password"
              element={
                suspended ? (
                  <Navigate to="/admin/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <ConfirmOtp />
                )
              }
            />
            <Route
              path="/admin/under-maintenance"
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
                  <Navigate to="/admin/under-maintenance" />
                ) : isLoggedIn ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <SignIn />
                )
              }
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
                    maintenance ? (
                      <Navigate to="/admin/under-maintenance" />
                    ) : isIdle ? (
                      <Navigate to="/admin/lock-screen" />
                    ) : suspended ? (
                      <Navigate to="/admin/account-suspended" />
                    ) : !isLoggedIn ? (
                      <Navigate to="/admin/sign-in" />
                    ) : (
                      <Component />
                    )
                  }
                  exact
                />
              ))}
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
