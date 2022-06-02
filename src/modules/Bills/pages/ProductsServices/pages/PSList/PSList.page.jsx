import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input, Table } from 'components';
// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { useEffect, useState } from 'react';
import { getProducts } from 'store';
import { Form, Formik } from 'formik';
import { Add } from './sections';

export const PSList = () => {
  // const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation('/Bills/ns');
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[16px]">
            <img
              className="w-[100px] h-[98px] rounded-[8px] object-contain bg-[yellow]"
              src={record?.base64Image}
              alt={record?.name}
            />
            <p className="text-white text-[14px]">{record?.description}</p>
          </div>
        );
      },
      width: '50%',
    },
    {
      title: 'Items',
      dataIndex: 'productLineItems',
      key: 'productLineItems',
      render: (lineItems) => {
        return (
          <div className="flex flex-col gap-[16px]">
            {lineItems?.map((item) => (
              <div className="flex flex-col gap-[4px]">
                <div className="text-white text-[14px]">{item?.name}</div>
                <div className="text-[#474761] text-[12px]">${item?.price}</div>
              </div>
            ))}
          </div>
        );
      },
      width: '20%',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => {
        let sum = 0;
        record?.productLineItems?.forEach((item) => {
          sum += item?.price;
        });
        return <>${sum}</>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <div
          className={`${
            status === 1
              ? 'bg-[#1C3238] text-[#0BB783]'
              : 'bg-[#3A2434] text-[#F64E60]'
          } px-[8px] py-[4px] w-[fit-content] rounded-[4px]`}
        >
          {status === 1 ? 'COMPLETED' : 'CANCELLED'}
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state?.products);

  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="p-[40px]">
      <Add show={showAdd} setShow={setShowAdd} />
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Formik initialValues={{ selectFilter: 'name' }}>
          {({ values }) => (
            <Form>
              <Table
                columns={columns}
                data={products}
                loading={loading}
                fieldToFilter={values?.selectFilter}
                // btnData={{
                //   onClick: () => setShowAdd(true),
                //   text: 'Add New Product',
                // }}
                editAction={(record) => (
                  <Button
                    onClick={() => {
                      navigate(
                        `/admin/dashboard/billing/products-services/list/details/${record?.id}`,
                        {
                          state: { product: record },
                        }
                      );
                    }}
                  >
                    View
                  </Button>
                )}
                deleteAction={(record) => (
                  <Button onClick={() => {}}>Delete</Button>
                )}
                permissions={permissions}
                customAdditionalBody={
                  <div className="min-w-[250px] flex items-center gap-[10px]">
                    <div className="text-white text-[14px] w-[100px]">
                      Filter By:
                    </div>
                    <Input
                      name="selectFilter"
                      type="select"
                      options={[
                        { value: 'name', label: 'Name' },
                        { value: 'total', label: 'Total' },
                        { value: 'status', label: 'Status' },
                      ]}
                    />
                  </div>
                }
                t={t}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
