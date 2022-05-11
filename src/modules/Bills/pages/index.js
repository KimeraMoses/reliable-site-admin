import Orders from './Orders/Orders.page';
import ClientsList from './Clients/ClientsList.page';

export const pages = [
  { path: '/orders', Component: Orders },
  { path: '/clients/list/show', Component: ClientsList },
];
