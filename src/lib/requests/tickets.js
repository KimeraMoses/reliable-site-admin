import { getConfig } from 'lib';
const ticketsConfig = (action) =>
    getConfig({ module: 'Users', action });

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
        orderBy: ['']
    },
    config: ticketsConfig('View'),
});

export const getTicketConfig = (id) => ({
    url: `${prefix}/${id}`,
    config: ticketsConfig('View'),
});

// Edit Brand
export const editTicketConfig = ({ id }) => ({
    url: `${prefix}/${id}`,
    config: ticketsConfig('Update')
});