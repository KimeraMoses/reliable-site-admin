import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Table } from 'components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';

export const PSList = () => {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation('/Bills/ns');
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });
  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (text) => {
        return (
          <div className="flex items-center gap-[12px]">
            <img
              src="https://i.ibb.co/FVMH8xR/images.png"
              alt="card"
              className="w-[32px] h-[20px] object-cover rounded-[4px]"
            />
            <p className="text-white">{text}</p>
          </div>
        );
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const data = [];
  for (let i = 0; i <= 40; i++) {
    data.push({
      key: i,
      id: i,
      name: `Client ${i}`,
      email: `Paul${i}@Fakemail.com`,
      companyName: `Mind2Matter ${i}`,
      paymentMethod: `**** 9783`,
      createdAt: `05/02/2022`,
    });
  }

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          columns={columns}
          data={data}
          // loading={loading}
          fieldToFilter="name"
          btnData={{
            text: 'Add Client',
            onClick: () => setShowAdd(true),
            customClass: 'px-[82px]',
          }}
          editAction={(record) => (
            <>
              <Button
                onClick={() => {
                  navigate(
                    '/admin/dashboard/billing/products-services/list/details/123'
                  );
                }}
              >
                View
              </Button>
              <Button onClick={() => {}}>Login As Client</Button>
            </>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
