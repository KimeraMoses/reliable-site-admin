
import { Button, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { Table } from 'components';
import { getInvoices } from 'store';

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
            title: t('issueFor'),
            dataIndex: 'product',
            key: 'product',
            render: (product) => {
                return (
                    <div className="flex items-center gap-[12px]">
                        {
                            product?.thumbnail && (
                                <img
                                    src={product?.thumbnail}
                                    alt="card"
                                    className="w-[32px] h-[20px] object-cover rounded-[4px]"
                                />
                            )
                        }
                        <p className="text-white">{product.name}</p>
                    </div>
                )
            }
        },
        {
            title: t('issueBy'),
            dataIndex: 'issueBy',
            key: 'issueBy',
            render: (issueBy) => {
                return (
                    <div className="flex items-center gap-[12px]">
                        <img
                            src={issueBy?.img}
                            alt="card"
                            className="w-[32px] h-[20px] object-cover rounded-[4px]"
                        />
                        <p className="text-white">{issueBy?.name}</p>
                    </div>
                )
            }
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return (
                    <div className={`bg-[${(status === "PENDING" && "#392F28") || (status === "COMPLETED" && "#1C3238") || (status === "CANCELLED" && "#3A2434")}] px-[8px] py-[4px] text-[${(status === "PENDING" && "#FFA800") || (status === "COMPLETED" && "#0BB783") || (status === "CANCELLED" && "#F64E60")}] w-[fit-content] rounded-[4px]`}>{status}</div>
                )
            }
        },
    ];

    // Setting data properly
    const [data, setData] = useState([]);
    useEffect(() => {
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
                    statusFilter={true}
                    fieldToFilter="billNo"
                    handleStatus={async (values) => {
                        await dispatch(getInvoices({ status: values }));
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