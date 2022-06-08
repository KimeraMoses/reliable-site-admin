
import { Button, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { Table } from 'components';
import { getInvoices } from 'store';
import { statusList } from 'lib';

export const InvoiceList = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('/Bills/ns');

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getInvoices());
        })();
    }, [dispatch]);

    const { invoices, loading } = useSelector((state) => state?.invoices);
    const { userModules } = useSelector((state) => state?.modules);

    const { permissions } = checkModule({
        module: 'Users',
        modules: userModules,
    });

    const columns = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return (
                    <Checkbox></Checkbox>
                )
            }
        },
        {
            title: t('invoiceId'),
            dataIndex: 'billNo',
            key: 'billNo',
        },
        {
            title: t('issueDate'),
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (createdOn) => moment(createdOn).format('DD/MM/YYYY'),
        },
        {
            title: t('dueDate'),
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (dueDate) => moment(dueDate).format('DD/MM/YYYY'),
        },
        {
            title: t('issuedFor'),
            dataIndex: 'issuedFor',
            key: 'issuedFor',
            render: (issuedFor, record) => {
                return (
                    <div className="flex items-center gap-[12px]">
                        {
                            record?.issueForImage && (
                                <img
                                    src={record?.issueForImage}
                                    alt="card"
                                    className="w-[32px] h-[20px] object-cover rounded-[4px]"
                                />
                            )
                        }
                        <p className="text-white">{issuedFor}</p>
                    </div>
                )
            }
        },
        {
            title: t('issuedBy'),
            dataIndex: 'issuedBy',
            key: 'issuedBy',
            render: (issuedBy, record) => {
                return (
                    <div className="flex items-center gap-[12px]">
                        {
                            record?.issueByImage && (
                                <img
                                    src={record?.issueByImage}
                                    alt="card"
                                    className="w-[32px] h-[20px] object-cover rounded-[4px]"
                                />
                            )
                        }
                        <p className="text-white">{issuedBy}</p>
                    </div>
                )
            }
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusValue = statusList(status);
                return (
                    <div className={`bg-[${statusValue.bg}] px-[8px] py-[4px] text-[${statusValue.text}] w-[fit-content] rounded-[4px]`}>{statusValue.name}</div>
                )
            }
        },
    ];

    // Setting data properly
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        setData([]);
        if (invoices.length) {
            const dataToSet = invoices.map((b) => {
                return {
                    ...b,
                    key: b?.id
                };
            });
            setData(dataToSet);
        }
    }, [invoices]);

    return (
        <div className="p-[40px]">
            <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
                <Table
                    columns={columns}
                    data={data}
                    loading={loading}
                    dateRageFilter={true}
                    statusFilter={statusList()}
                    fieldToFilter="billNo"
                    handleStatus={async (values) => {
                        setStatus(values);
                        let details = {
                            status: values
                        }
                        if (startDate && endDate) {
                            details["startDate"] = startDate;
                            details["endDate"] = endDate;
                        }
                        await dispatch(getInvoices(details));
                    }}
                    handleDateRange={async (date, dateString, id) => {
                        let startDate = '';
                        let endDate = '';
                        let details = {};
                        if (date) {
                            startDate = date[0]._d;
                            endDate = date[1]._d;
                            details['startDate'] = startDate;
                            details['endDate'] = endDate;
                        }
                        
                        if (status) {
                            details["status"] = status;
                        }

                        setStartDate(startDate);
                        setEndDate(endDate);

                        await dispatch(getInvoices(details));
                    }}
                    editAction={(record) => (
                        <Button onClick={() => {
                            navigate(`/admin/dashboard/billing/invoices/list/details/${record.id}`);
                        }}>View</Button>
                    )}
                    permissions={permissions}
                    t={t}
                />
            </div>
        </div>
    )
}