import Orders from './Orders/Orders.page';
import Clients from './Clients/Clients.page';

export const pages = [
  { path: '/orders', Component: Orders },
  { path: '/clients/*', Component: Clients },
];
