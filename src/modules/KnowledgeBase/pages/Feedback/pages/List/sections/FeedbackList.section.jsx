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

export const FeedbackList = () => {
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
      title: 'Article Title',
      dataIndex: 'titile',
      key: 'title',
      render: () => {
        return (
          <div className="flex items-center gap-[12px] rounded-[8px]">
            <img className="w-[40px]" src="/article.jpg" alt="article title" />
            <p className="text-sm">Article Title</p>
          </div>
        );
      },
    },

    {
      title: 'Article Description',
      dataIndex: 'description',
      key: 'description',
      render: () => {
        return (
          <div className="text-sm">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy.
          </div>
        );
      },
    },
    {
      title: 'Number of Feedbacks',
      dataIndex: 'feedbacknumbers',
      key: 'feedbacknumbers',
      render: () => {
        return <div className="text-sm">4 User Feedbacks</div>;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: () => {
        return (
          <div className="bg-[#2F264F] px-[8px] py-[4px] uppercase text-[#8950FC] w-[fit-content] rounded-[4px]">
            Article Category
          </div>
        );
      },
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
          key: b?.id,
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
              status: values,
            };
            if (startDate && endDate) {
              details['startDate'] = startDate;
              details['endDate'] = endDate;
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
              details['status'] = status;
            }

            setStartDate(startDate);
            setEndDate(endDate);

            await dispatch(getInvoices(details));
          }}
          editAction={(record) => (
            <Button
              onClick={() => {
                navigate(
                  `/admin/dashboard/knowledge-base/feedback/view/${record.id}`
                );
              }}
            >
              View
            </Button>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
