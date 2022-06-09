import Clients from './Articles/Articles.page';
import UserSubmissions from './UserSubmissions/UserSubmissions.page';

export const pages = [
  { path: '/articles/*', Component: Clients },
  { path: '/user-submissions/*', Component: UserSubmissions },
];

// {
//   name: 'UserSubmissions',
//   subLinks: [
//     {
//       name: 'Submission Details',
//       path: '/admin/dashboard/knowledge-base/user-submissions/view/:id',
//     },
//   ],
// },
