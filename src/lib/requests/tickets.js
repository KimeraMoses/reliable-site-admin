import { getConfig } from 'lib';
const ticketsConfig = (action) => getConfig({ module: 'Users', action });

const prefix = `/api/tickets`;

export const getTicketsConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: ['ticketPriority'],
    ticketPriority: 0,
  },
  config: ticketsConfig('View'),
});

export const getTicketConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: ticketsConfig('View'),
});

export const createTicketConfig = () => ({
  url: `${prefix}`,
  config: ticketsConfig('Create'),
});

export const editTicketConfig = ({ id }) => ({
  url: `${prefix}/${id}`,
  config: ticketsConfig('Update'),
});

export const getTicketsByClintIDConfig = ({ id }) => ({
  url: `${prefix}/getticketsbyclientid/${id}`,
  config: ticketsConfig('View'),
});

export const getAssignedTicketsByIDConfig = ({ id }) => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: ['assignedTo'],
      keyword: id,
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
    // ticketStatus: '0 = Active',
    // ticketPriority: '0 = Urgent',
    // ticketRelatedTo: '0 = KnowledgeBase',
  },
  config: ticketsConfig('View'),
});
