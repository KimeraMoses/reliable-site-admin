import { getConfig } from 'lib';

// NotificationTemplate End-Points
const NotificationTemplate = 'Users';
const prefix = '/api/v1/admin/notificationstemplate';
// Get List of All Notification Templates
export const getNotificationTemplatesConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  config: getConfig({ module: NotificationTemplate, action: 'View' }),
});

// // Add Payment Gateway
// export const addPaymentGatewayConfig = () => ({
//   url: `/api/paymentgateways`,
//   config: getConfig({ module: PaymentGateway, action: 'Create' }),
// });
// // Edit Payment Gateway
// export const editPaymentGatewayConfig = ({ id }) => ({
//   url: `/api/paymentgateways/${id}`,
//   config: getConfig({ module: PaymentGateway, action: 'Update' }),
// });
// // Delete Payment Gateway
// export const deletePaymentGatewayConfig = ({ id }) => ({
//   url: `/api/paymentgateways/${id}`,
//   config: getConfig({ module: PaymentGateway, action: 'Remove' }),
// });
