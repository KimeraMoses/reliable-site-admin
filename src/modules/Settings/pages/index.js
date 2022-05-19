import { lazy } from 'react';

export const pages = [
  { path: 'general', Component: lazy(() => import('./General/General.page')) },
  { path: 'billing', Component: lazy(() => import('./Billing/Billing.page')) },
  {
    path: 'payment-gateways',
    Component: lazy(() => import('./PaymentGateways/PaymentGateways.page')),
  },
];

// {
//   name: 'Support',
//   path: '/admin/dashboard/settings/support',
// },
// {
//   name: 'SMTP',
//   path: '/admin/dashboard/settings/smtp',
// },
// {
//   name: 'Email Templates',
//   path: '/admin/dashboard/settings/email-templates',
// },
// {
//   name: 'Maintenance',
//   path: '/admin/dashboard/settings/maintenance',
// },
// {
//   name: 'API',
//   path: '/admin/dashboard/settings/api',
// },
