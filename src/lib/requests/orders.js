import { getConfig } from 'lib';

const ordersConfig = (action) => getConfig({ module: 'Users', action });

const prefix = `/api/v1/admin/orders`;

export const getOrdersConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  config: ordersConfig('View'),
});

export const createOrderConfig = () => ({
  url: `${prefix}`,
  config: ordersConfig('Create'),
});
