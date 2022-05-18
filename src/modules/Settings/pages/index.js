import { lazy } from 'react';

export const pages = [
  { path: 'general', Component: lazy(() => import('./General/General.page')) },
  { path: 'billing', Component: lazy(() => import('./Billing/Billing.page')) },
];
