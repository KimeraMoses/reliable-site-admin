import { Button } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { Table } from 'components';
import { getInvoices } from 'store';
import { AddCategory } from './sections';

export const CategoryList = () => {
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
      title: 'Category ID',
      dataIndex: 'categoryid',
      key: 'categoryid',
      render: () => {
        return (
          <div className="">
            <p className="text-sm">255656</p>
          </div>
        );
      },
    },

    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      width: 600,
      render: () => {
        return <div className="text-sm">Category Name</div>;
      },
    },
    {
      title: 'Articles Under Category',
      dataIndex: 'undercategory',
      key: 'undercategory',
      render: () => {
        return <div className="text-sm">4 Articles</div>;
      },
    },
    {
      title: 'Creation Date',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (createdOn) => moment(createdOn).format('DD/MM/YYYY'),
    },
  ];

  // Setting data properly
  const [addModalShow, setAddModalShow] = useState(false);
  const [data, setData] = useState([]);
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
    <div className="mt-[20px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <AddCategory show={addModalShow} setShow={setAddModalShow} />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          dateRageFilter={true}
          fieldToFilter="billNo"
          btnData={{
            text: 'Add Category',
            onClick: () => setAddModalShow(true),
          }}
          handleDateRange={() => {}}
          editAction={() => <Button>Edit</Button>}
          deleteAction={() => (
            <Button className="focus:bg-[unset]">Delete</Button>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
