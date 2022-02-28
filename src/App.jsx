import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import pages, { Error404, dashboardPages } from 'pages';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

function App() {
  return (
    <div className="App bg-custom-main flex items-center content-center">
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            {pages.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} exact />
            ))}
            <Route path="/dashboard">
              {dashboardPages.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
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
