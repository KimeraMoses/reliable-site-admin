import {
  Dashboard,
  Billing,
  Knowledge,
  Reports,
  Settings,
  Support,
  Users,
} from 'icons';

export const sidebarData = [
  {
    name: 'Dashboard',
    module: 'Dashboard',
    path: '/admin/dashboard',
    icon: (fill) => <Dashboard fill={fill} />,
  },
  {
    name: 'Billing',
    module: 'Billing',
    path: '/admin/dashboard/billing',
    icon: (fill) => <Billing fill={fill} />,
    subLinks: [
      { name: 'Orders', path: '/admin/dashboard/billing/orders' },
      {
        name: 'Clients',
        path: '/admin/dashboard/billing/clients',
        showDropdown: true,
        subLinks: [
          {
            name: 'Clients List',
            path: '/admin/dashboard/billing/clients/list/show',
            subLinks: [
              {
                name: 'Client Details',
                path: '/admin/dashboard/billing/clients/list/details/:id',
              },
            ],
          },
          {
            name: 'Mass Email Clients',
            path: '/admin/dashboard/billing/clients/send-email/mass-email-clients',
          },
          {
            name: 'Client Notification',
            path: '/admin/dashboard/billing/clients/show-notifications/client-notifications',
          },
        ],
      },
      {
        name: 'Products & Services',
        path: '/admin/dashboard/billing/products-services',
        showDropdown: true,
        subLinks: [
          {
            name: 'Products & Services List',
            path: '/admin/dashboard/billing/products-services/list/show',
            subLinks: [
              {
                name: 'Product & Service Details',
                path: '/admin/dashboard/billing/products-services/list/details/:id',
              },
            ],
          },
          {
            name: 'Cancellation Requests',
            path: '/admin/dashboard/billing/products-services/cancellation/requests',
          },
        ],
      },
    ],
  },
  {
    name: 'Support',
    module: 'Support',
    path: '/admin/dashboard/support',
    icon: (fill) => <Support fill={fill} />,
  },
  {
    name: 'Knowledge Base',
    module: 'KnowledgeBase',
    path: '/admin/dashboard/knowledge-base',
    icon: (fill) => <Knowledge fill={fill} />,
  },
  {
    name: 'Reports',
    module: 'Reports',
    path: '/admin/dashboard/reports',
    icon: (fill) => <Reports fill={fill} />,
  },
  {
    name: 'Admin Users',
    module: 'Users',
    path: '/admin/dashboard/users',
    icon: (fill) => <Users fill={fill} />,
    subLinks: [
      {
        name: 'Admin Users List',
        path: '/admin/dashboard/users/list',
        subLinks: [
          {
            name: 'Admin Details',
            path: '/admin/dashboard/users/list/admin-details/:id',
          },
        ],
      },
      { name: 'Admin Users Groups', path: '/admin/dashboard/users/groups' },
    ],
  },
  {
    name: 'Settings',
    module: 'Settings',
    path: '/admin/dashboard/settings',
    icon: (fill) => <Settings fill={fill} />,
    subLinks: [
      {
        name: 'General',
        path: '/admin/dashboard/settings/general',
      },
      {
        name: 'Billing',
        path: '/admin/dashboard/settings/billing',
      },
      {
        name: 'Payment Gateways',
        path: '/admin/dashboard/settings/payment-gateways',
      },
      {
        name: 'Support',
        path: '/admin/dashboard/settings/support',
      },
      {
        name: 'Departments',
        path: '/admin/dashboard/settings/departments',
      },
      {
        name: 'Brands',
        path: '/admin/dashboard/settings/brands',
      },
      {
        name: 'SMTP',
        path: '/admin/dashboard/settings/smtp',
        subLinks: [
          {
            name: 'Add New Configuration',
            path: '/admin/dashboard/settings/smtp/configuration/add',
          },
          {
            name: 'Edit Configuration',
            path: '/admin/dashboard/settings/smtp/edit/:id',
          },
        ],
      },
      {
        name: 'Email Templates',
        path: '/admin/dashboard/settings/email-templates',
        subLinks: [
          {
            name: 'Add New Template',
            path: '/admin/dashboard/settings/email-templates/template/add',
          },
          {
            name: 'Edit Template',
            path: '/admin/dashboard/settings/email-templates/edit/:id',
          },
        ],
      },
      {
        name: 'Maintenance',
        path: '/admin/dashboard/settings/maintenance',
      },
      {
        name: 'API',
        path: '/admin/dashboard/settings/api',
      },
      {
        name: 'Portal',
        path: '/admin/dashboard/settings/portal',
      },
      
    ],
  },
  {
    name: 'Account Settings',
    hideInSide: true,
    hideBread: true,
    module: 'AccountSettings',
    path: '/admin/dashboard/account-settings',
    icon: () => <></>,
    subLinks: [
      {
        name: 'General',
        path: '/admin/dashboard/account-settings/general',
      },
    ],
  },
];
