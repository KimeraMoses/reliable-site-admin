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
