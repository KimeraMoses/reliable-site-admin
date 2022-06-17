import { getConfig } from 'lib';
const ticketCommentRepliesConfig = (action) => getConfig({ module: 'Users', action });

const prefix = `/api/ticketcommentreplies`;

export const addTicketRepliesConfig = () => ({
    url: `${prefix}`,
    config: ticketCommentRepliesConfig('Create')
});
