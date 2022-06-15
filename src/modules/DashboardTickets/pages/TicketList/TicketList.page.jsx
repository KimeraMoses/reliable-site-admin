import { Navigation } from './sections';
import { Ticket as TicketIcon } from 'icons';
import { useEffect, useState } from 'react';
import { Table } from 'components';
import { checkModule } from 'lib/checkModule';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from 'store';
import { groupBy } from 'lib';
import { useNavigate } from 'react-router-dom';

export const TicketList = () => {
    const { t } = useTranslation('/Users/ns');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tickets, loading } = useSelector((state) => state?.tickets);

    const { userModules } = useSelector((state) => state?.modules);

    let activeTicket = tickets ? groupBy(tickets, 'ticketStatus') : {};
    useEffect(() => {
        (async () => {
            await dispatch(getTickets());
        })();
    }, [dispatch]);


    const [active, setActive] = useState(t('active'));
    const links = [
        { label: t('active'), count: activeTicket ? activeTicket[0].length : 0, onClick: () => handleActive(0, t('active')) },
        { label: t('waiting'), count: activeTicket && Object.keys(activeTicket).length > 2 ? activeTicket[2].length : 0, onClick: () => handleActive(2, t('waiting')) },
        { label: t('closed'), count: activeTicket && Object.keys(activeTicket).length > 1 ? activeTicket[1].length : 0, onClick: () => handleActive(1, t('closed')) }
    ];

    const handleActive = (v, text) => {
        setActive(text);
        if (tickets.length) {
            const dataToSet = tickets?.filter(function (el) { return el.ticketStatus === v }).map((b) => {
                return {
                    ...b,
                    key: b?.id
                };
            });
            setData(dataToSet);
        }
    }

    const { permissions } = checkModule({
        module: 'Users',
        modules: userModules,
    });

    const columns = [
        {
            title: '',
            dataIndex: 'description',
            key: 'description',
            render: (description, record) => {
                return (
                    <div className="flex"
                        onClick={() => {
                            navigate(`/admin/dashboard/tickets/list/details/${record?.id}`)
                        }}>
                        <TicketIcon />
                        <div className="ml-[8px]">
                            <h3 className={`text-[#FFFFFF]`}>{`Ticket Title`} <span className={`uppercase ml-[12px] text-[10px] bg-[#323248] pt-[4px] pb-[4px] pl-[8px] pr-[8px]`}>Tag title</span></h3>
                            <p className={'text-[#474761] text-[14px] mt-[12px]'}>{description}</p>
                        </div>
                    </div >
                )
            }
        }
    ];

    // Setting data properly
    const [data, setData] = useState([]);
    useEffect(() => {
        setData([]);
        if (tickets.length) {
            const dataToSet = tickets?.filter(function (el) { return el.ticketStatus === 0 }).map((b) => {
                return {
                    ...b,
                    key: b?.id
                };
            });
            setData(dataToSet);
        }
    }, [tickets]);

    return (
        <div className="p-[40px] dashboard-ticket">
            <Navigation active={active} links={links} />
            <div className={`p-[40px] mt-[20px] bg-[#1E1E2D]`}>
                <Table
                    columns={columns}
                    data={data}
                    loading={loading}
                    fieldToFilter="billNo"
                    permissions={permissions}
                    hideActions={true}
                    t={t}
                />
            </div>
        </div>
    )
}