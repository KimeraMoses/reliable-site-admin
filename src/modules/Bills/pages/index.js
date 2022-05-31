import Orders from './Orders/Orders.page';
import Clients from './Clients/Clients.page';
import ProductsServices from './ProductsServices/ProductsServices.page';

export const pages = [
  { path: '/orders', Component: Orders },
  { path: '/clients/*', Component: Clients },
  { path: '/products-services/*', Component: ProductsServices },
];
