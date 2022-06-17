import { lazy } from 'react';

const pages = [
  {
    path: '/unauthorized-access',
    Component: lazy(() =>
      import('./unauthorized-access/UnauthorizedAccess.page')
    ),
  },
  {
    path: '/lock-screen',
    Component: lazy(() => import('./lock-screen/LockScreen.page')),
  },
];

export const dashboardPages = [
  {
    path: '/dashboard',
    Component: lazy(() => import('./Dashboard/Home/Home.page')),
  },
  {
    path: '/dashboard/tickets/*',
    Component: lazy(() => import('../modules/DashboardTickets/component.jsx')),
  },
  {
    path: '/dashboard/about',
    Component: lazy(() => import('./Dashboard/About/About.page')),
  },
  {
    path: '/dashboard/editor',
    Component: lazy(() => import('./Dashboard/Editor/Editor.page')),
  },
  {
    path: '/dashboard/users/*',
    Component: lazy(() => import('./Dashboard/Users/Users.page')),
  },
  {
    path: '/dashboard/billing/*',
    Component: lazy(() => import('./Dashboard/Billing/Billing.page')),
  },
  {
    path: '/dashboard/account-settings/*',
    Component: lazy(() =>
      import('./Dashboard/AccountSettings/AccountSettings.page')
    ),
  },
  {
    path: '/dashboard/settings/*',
    Component: lazy(() => import('./Dashboard/Settings/Settings.page')),
  },
  {
    path: '/dashboard/knowledge-base/*',
    Component: lazy(() =>
      import('./Dashboard/KnowledgeBase/KnowledgeBase.page')
    ),
  },
  {
    path: '/dashboard/reports/*',
    Component: lazy(() => import('./Dashboard/Reports/Reports.page')),
  },
];

export default pages;
export const Error404 = lazy(() => import('./error-404/Error404.page'));
