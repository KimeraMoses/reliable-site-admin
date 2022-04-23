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
    path: '/admin/dashboard',
    icon: (fill) => <Dashboard fill={fill} />,
  },
  {
    name: 'Billing',
    path: '/admin/dashboard/billing',
    icon: (fill) => <Billing fill={fill} />,
  },
  {
    name: 'Support',
    path: '/admin/dashboard/support',
    icon: (fill) => <Support fill={fill} />,
  },
  {
    name: 'Knowledge Base',
    path: '/admin/dashboard/knowledge-base',
    icon: (fill) => <Knowledge fill={fill} />,
  },
  {
    name: 'Reports',
    path: '/admin/dashboard/reports',
    icon: (fill) => <Reports fill={fill} />,
  },
  {
    name: 'Admin Users',
    path: '/admin/dashboard/users',
    icon: (fill) => <Users fill={fill} />,
  },
  {
    name: 'Settings',
    path: '/admin/dashboard/settings',
    icon: (fill) => <Settings fill={fill} />,
  },
];
