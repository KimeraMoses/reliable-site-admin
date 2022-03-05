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
import { AutoAuthenticate } from "store/Actions/AuthActions";
import "./App.scss";
import SignIn from "pages/sign-in/SignIn.page";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    AutoAuthenticate(dispatch);
  }, [dispatch]);

  return (
    <div className="App bg-custom-main flex items-center content-center">
      <ToastContainer />
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route
              path="/admin/sign-in"
              element={
                isLoggedIn ? <Navigate to="/admin/dashboard" /> : <SignIn />
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
                  element={!isLoggedIn? <Navigate to="/admin/sign-in"/>:<Component />}
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
