import {
  Dashboard,
  Billing,
  Knowledge,
  Reports,
  Settings,
  Support,
  // Users,
} from "icons";
import { checkModule } from "lib/checkModule";
import { useSelector } from "react-redux";

export const useSidebarData = () => {
  // Ticket Departments Dynamically Being Done Below
  const { departments } = useSelector((state) => state?.departments);
  const { tickets } = useSelector((state) => state?.tickets);
  const { data } = useSelector((state) => state?.count);
  const isSuperAdmin = useSelector(
    (state) => state?.auth?.user?.userRolesResponse?.userRoles
  )[1]?.enabled;
  const { userModules } = useSelector((state) => state?.modules);
  const departmentsLoading = useSelector(
    (state) => state?.departments?.loading
  );
  const ticketsLoading = useSelector((state) => state?.tickets?.loading);
  const dataLoading = useSelector((state) => state?.count?.loading);
  const { user } = useSelector((state) => state?.auth);

  // My Tickets
  const myTickets = tickets?.filter(
    (ticket) => ticket?.assignedTo === user?.id
  );
  // Setting Departments
  const ticketsWithDepartmentName = myTickets?.map((ticket) => ({
    ...ticket,
    departmentName: departments?.filter(
      (dept) => dept?.id === ticket?.departmentId
    )[0]?.name,
  }));

  // console.log(ticketsWithDepartmentName);

  const finalTickets = ticketsWithDepartmentName?.filter(
    (ticket) => ticket?.departmentName !== undefined
  );
  const counts = {};

  const activeTickets = finalTickets?.filter(
    (ticket) => ticket?.ticketStatus === 0
  );
  activeTickets?.forEach(function (x) {
    counts[x?.departmentName] = (counts[x?.departmentName] || 0) + 1;
  });

  // console.log(data);
  function getUniqueListBy(arr, key) {
    return [...new Map(arr?.map((item) => [item?.[key], item]))?.values()];
  }
  const uniqueDeptTickets = getUniqueListBy(finalTickets, "departmentId");

  const links = uniqueDeptTickets?.map((el) => ({
    name: el?.departmentName,
    path: `/admin/dashboard/support/tickets/by-departments/${el?.departmentId}`,
    count: counts[el?.departmentName],
    show: true,
    subLinks: [
      {
        name: "Ticket Details",
        path: `/admin/dashboard/support/tickets/by-departments/${el?.departmentId}/details/${el?.id}`,
      },
    ],
  }));

  const findModule = (moduleName) =>
    checkModule({ modules: userModules, module: moduleName })?.permissions
      ?.View;

  // Side Bar Data
  const sidebarData = [
    {
      name: "Dashboard",
      module: "Dashboard",
      path: "/admin/dashboard",
      show: findModule("Dashboard"),
      icon: (fill) => <Dashboard fill={fill} />,
    },
    {
      name: "Billing",
      module: "Billing",
      path: "/admin/dashboard/billing",
      show: findModule("Orders"),
      count: data?.billCount > 0 ? data?.billCount : null,
      icon: (fill) => <Billing fill={fill} />,
      subLinks: [
        {
          name: "Orders",
          path: "/admin/dashboard/billing/orders",
          count:
            isSuperAdmin && data?.orders?.All > 0
              ? data?.orders?.All
              : data?.orders?.NotCompleted > 0
              ? data?.orders?.NotCompleted
              : null,
          show: findModule("Orders"),
          showDropdown: true,
          subLinks: [
            {
              name: "All Orders",
              path: "/admin/dashboard/billing/orders/all-orders/list",
              show: true,
              subLinks: [
                {
                  name: "Edit Order",
                  path: "/admin/dashboard/billing/orders/all-orders/list/edit/:id",
                  show: true,
                },
                {
                  name: "Add Order",
                  path: "/admin/dashboard/billing/orders/all-orders/list/add/new",
                  show: true,
                },
              ],
            },
            {
              name: "Your Orders",
              path: "/admin/dashboard/billing/orders/your-orders/list",
              show: true,
              subLinks: [
                {
                  name: "Edit Order",
                  path: "/admin/dashboard/billing/orders/your-orders/list/edit/:id",
                  show: true,
                },
                {
                  name: "Add Order",
                  path: "/admin/dashboard/billing/orders/your-orders/list/add/new",
                  show: true,
                },
              ],
            },
            {
              name: "Order Templates",
              path: "/admin/dashboard/billing/orders/order-templates/list",
              show: true,
              subLinks: [
                {
                  name: "Edit Order Template",
                  path: "/admin/dashboard/billing/orders/order-templates/list/edit/:id",
                  show: true,
                },
                {
                  name: "Add Order Template",
                  path: "/admin/dashboard/billing/orders/order-templates/list/add/new",
                  show: true,
                },
              ],
            },
          ],
        },
        {
          name: "Clients",
          count: data?.clientsCount > 0 ? data?.clientsCount : null,
          path: "/admin/dashboard/billing/clients",
          show: findModule("Clients"),
          showDropdown: true,
          subLinks: [
            {
              name: "Clients List",
              path: "/admin/dashboard/billing/clients/list/show",
              subLinks: [
                {
                  name: "Client Details",
                  path: "/admin/dashboard/billing/clients/list/details/:id",
                },
              ],
            },
            {
              name: "Mass Email Clients",
              path: "/admin/dashboard/billing/clients/send-email/mass-email-clients",
            },
            {
              name: "Client Notification",
              path: "/admin/dashboard/billing/clients/show-notifications/client-notifications",
              subLinks: [
                {
                  name: "Add New",
                  path: "/admin/dashboard/billing/clients/show-notifications/client-notifications/add/new",
                },
                {
                  name: "Edit",
                  path: "/admin/dashboard/billing/clients/show-notifications/client-notifications/edit/:id",
                },
              ],
            },
          ],
        },
        {
          name: "Products & Services",
          show: findModule("Products"),
          // count: data?.products?.All > 0 ? data?.products?.All : null,
          path: "/admin/dashboard/billing/products-services",
          showDropdown: true,
          subLinks: [
            {
              name: "Products & Services List",
              path: "/admin/dashboard/billing/products-services/list/show",
              show: true,
              subLinks: [
                {
                  name: "Product & Service Details",
                  path: "/admin/dashboard/billing/products-services/list/details/:id",
                },
              ],
            },
            {
              name: "Cancellation Requests",
              path: "/admin/dashboard/billing/products-services/cancellation/requests",
            },
          ],
        },
        {
          name: "Invoices",
          show: findModule("Invoices"),
          path: "/admin/dashboard/billing/invoices",
          showDropdown: true,
          subLinks: [
            {
              name: "Invoice List",
              path: "/admin/dashboard/billing/invoices/list/show",
              subLinks: [
                {
                  name: "Invoice Details",
                  path: "/admin/dashboard/billing/invoices/list/details/:id",
                },
              ],
            },
            {
              name: "Transactions",
              count:
                data?.transactionsCount > 0 ? data?.transactionsCount : null,
              path: "/admin/dashboard/billing/invoices/transactions",
            },
          ],
        },
        {
          name: "WHMCS Import Tool",
          show: findModule("WHMCS"),
          path: "/admin/dashboard/billing/WHMCS-import",
        },
        {
          name: "Logs",
          path: "/admin/dashboard/billing/logs",
          show: findModule("Logs"),
          showDropdown: true,
          subLinks: [
            { name: "Logs", path: "/admin/dashboard/billing/logs" },
            { name: "Gateway Logs", path: "#" },
          ],
        },
        {
          name: "WebHooks",
          count: data?.webHooksCount > 0 ? data?.webHooksCount : null,
          show: findModule("WebHooks"),
          path: "/admin/dashboard/billing/webhooks",
        },
      ],
    },
    {
      name: "Support",
      module: "Support",
      show: findModule("Support"),
      count:
        isSuperAdmin && data?.tickets?.All > 0
          ? data?.tickets?.All
          : data?.tickets?.AssignedToMe > 0
          ? data?.tickets?.AssignedToMe
          : null,
      path: "/admin/dashboard/support",
      icon: (fill) => <Support fill={fill} />,
      subLinks: [
        // {
        //   name: "Queue",
        //   count:
        //     data?.tickets?.All > 0
        //       ? data?.tickets?.All - data?.tickets?.AssignedToAnyone
        //       : null,
        //   show: true,
        //   path: "/admin/dashboard/support/tickets/queue",
        //   // subLinks: [
        //   //   {
        //   //     name: "Tickets Details",
        //   //     path: "/admin/dashboard/support/tickets/list/details/:id",
        //   //   },
        //   // ],
        // },
        {
          name: "My Tickets",
          count:
            !isSuperAdmin && data?.tickets?.All > 0
              ? data?.tickets?.All
              : data?.tickets?.AssignedToMe > 0
              ? data?.tickets?.AssignedToMe
              : null,
          show: true,
          path: "/admin/dashboard/support/tickets/list",
          subLinks: [
            {
              name: "Tickets Details",
              path: "/admin/dashboard/support/tickets/list/details/:id",
            },
          ],
        },
        ...links,
        {
          name: "Tickets List",
          count: data?.tickets?.All > 0 ? data?.tickets?.All : null,
          show: findModule("TicketList"),
          path: "/admin/dashboard/support/tickets/show-all/list",
          subLinks: [
            {
              name: "Ticket Details",
              path: "/admin/dashboard/support/tickets/show-all/list/details/:id",
            },
          ],
        },
      ],
    },
    {
      name: "Knowledge Base",
      module: "KnowledgeBase",
      show: findModule("KnowledgeBase"),
      count:
        data?.knowledgeBase?.ReviewedCount > 0
          ? data?.knowledgeBase?.ReviewedCount
          : null,
      path: "/admin/dashboard/knowledge-base",
      icon: (fill) => <Knowledge fill={fill} />,
      subLinks: [
        {
          name: "Articles",
          count: data?.articlesCount > 0 ? data?.articlesCount : null,
          path: "/admin/dashboard/knowledge-base/articles",
          show: true,
          subLinks: [
            {
              name: "Article Detail",
              path: "/admin/dashboard/knowledge-base/articles/view/:id",
            },
            {
              name: "Add New Article",
              path: "/admin/dashboard/knowledge-base/articles/add/new",
            },
            {
              name: "Edit Article",
              path: "/admin/dashboard/knowledge-base/articles/edit/:id",
            },
          ],
        },
        {
          name: "Feedback",
          path: "/admin/dashboard/knowledge-base/feedback",
          show: true,
          subLinks: [
            {
              name: "Feedback Details",
              path: "/admin/dashboard/knowledge-base/feedback/view/:id",
            },
          ],
        },
        {
          name: "Categories",
          show: true,
          path: "/admin/dashboard/knowledge-base/categories",
        },
      ],
    },
    {
      name: "Reports",
      module: "Reports",
      show: findModule("Reports"),
      path: "/admin/dashboard/reports",
      icon: (fill) => <Reports fill={fill} />,
      subLinks: [
        {
          name: "Annual Income Report",
          show: true,
          path: "/admin/dashboard/reports/anuual/income",
        },
        {
          name: "Support Response Time",
          show: true,
          path: "/admin/dashboard/reports/support-response/time",
        },
        {
          name: "Support Ticket Reply Count",
          show: true,
          path: "/admin/dashboard/reports/support-ticket-reply/count",
        },
        {
          name: "Reports By Filters",
          show: true,
          path: "/admin/dashboard/reports/tickets-by/filters",
        },
      ],
    },
    {
      name: "Settings",
      show: findModule("Settings"),
      module: "Settings",
      path: "/admin/dashboard/settings",
      icon: (fill) => <Settings fill={fill} />,
      subLinks: [
        {
          name: "General",
          path: "/admin/dashboard/settings/general",
          show: true,
        },
        {
          name: "Tickets",
          path: "/admin/dashboard/settings/tickets",
          show: true,
        },
        {
          name: "Billing",
          path: "/admin/dashboard/settings/billing",
          show: findModule("BillingSettings"),
        },
        {
          name: "Payment Gateways",
          path: "/admin/dashboard/settings/payment-gateways",
          show: findModule("PaymentGateways"),
        },
        {
          name: "Support",
          show: true,
          path: "/admin/dashboard/settings/support",
        },
        {
          name: "Departments",
          path: "/admin/dashboard/settings/departments",
          show: findModule("Departments"),
        },
        {
          name: "Brands",
          path: "/admin/dashboard/settings/brands",
          show: findModule("Brands"),
        },
        {
          name: "SMTP",
          path: "/admin/dashboard/settings/smtp",
          show: findModule("SMTP"),
          subLinks: [
            {
              name: "Add New Configuration",
              path: "/admin/dashboard/settings/smtp/configuration/add",
            },
            {
              name: "Edit Configuration",
              path: "/admin/dashboard/settings/smtp/edit/:id",
            },
          ],
        },
        {
          name: "Email Templates",
          path: "/admin/dashboard/settings/email-templates",
          show: findModule("EmailTemplates"),
          subLinks: [
            {
              name: "Add New Template",
              path: "/admin/dashboard/settings/email-templates/template/add",
            },
            {
              name: "Edit Template",
              path: "/admin/dashboard/settings/email-templates/edit/:id",
            },
          ],
        },
        {
          name: "Admin Users",
          show: findModule("AdminUsers") && findModule("AdminGroups"),
          count: data?.adminsCount > 0 ? data?.adminsCount : null,
          path: "/admin/dashboard/settings/users/list",
          subLinks: [
            {
              name: "Admin Details",
              path: "/admin/dashboard/settings/users/list/admin-details/:id",
            },
          ],
        },
        {
          name: "Admin Groups",
          show: findModule("AdminUsers") && findModule("AdminGroups"),
          count: data?.adminGroupCount > 0 ? data?.adminGroupCount : null,
          path: "/admin/dashboard/settings/users/groups",
        },
        {
          name: "Maintenance",
          show: true,
          path: "/admin/dashboard/settings/maintenance",
        },
        {
          name: "API",
          path: "/admin/dashboard/settings/api",
          show: findModule("SettingAPIKeys"),
        },
        // {
        //   name: 'Portal',
        //   path: '/admin/dashboard/settings/portal',
        // },
      ],
    },
    {
      name: "Account Settings",
      hideInSide: true,
      hideBread: true,
      module: "AccountSettings",
      show: true,
      path: "/admin/dashboard/account-settings",
      icon: () => <></>,
      subLinks: [
        {
          name: "General",
          show: true,
          path: "/admin/dashboard/account-settings/general",
        },
      ],
    },
  ];

  return departmentsLoading || ticketsLoading || dataLoading ? [] : sidebarData;
};
