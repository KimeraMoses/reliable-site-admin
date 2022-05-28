import { Button, Switch } from 'antd';
import { Table } from 'components';
import { checkModule } from 'lib/checkModule';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from 'store';
import { useTranslation } from "react-i18next";
import {
  AddBrand,
  DeleteBrand,
  EditBrand,
} from './sections';

const Brands = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const { t } = useTranslation("/Brands/ns");
  const columns = [
    {
      title: t('name'),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t('companyName'),
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: t('logo'),
      dataIndex: "logo",
      key: "logo",
    },
    {
      title: t('clientAssigned'),
      key: "clientAssigned",
      dataIndex: "clientAssigned",
    },
    {
      title: t('status'),
      key: "status",
      dataIndex: "status",
      render: (status) =>
        status ? (
          <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#0BB783] w-[fit-content] rounded-[4px]">
            {"Enable"}
          </div>
        ) : (
          <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#F64E60] w-[fit-content] rounded-[4px]">
            {"Disable"}
          </div>
        ),
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const { brands, loading } = useSelector(
    (state) => state.brands
  );

  // Check for permissions Start
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Settings',
    modules: userModules,
  });
  // Check for permissions End

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    if (brands.length) {
      const dataToSet = brands.map((b) => {
        return {
          ...b,
          key: b?.id,
        };
      });
      setData(dataToSet);
    }
  }, [brands]);

  return (
    <div className="m-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
      <AddBrand show={addModalShow} setShow={setAddModalShow} />
      <EditBrand
        show={editModalShow}
        setShow={setEditModalShow}
        editValue={editValue}
      />
      <DeleteBrand
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        id={deleteID}
      />
      <Table
        columns={columns}
        data={data}
        permissions={permissions}
        loading={loading}
        fieldToFilter="name"
        btnData={{
          text: t('addNewBrand'),
          onClick: () => setAddModalShow(true),
        }}
        editAction={(record) => (
          <Button
            onClick={() => {
              setEditValue(record);
              setEditModalShow(true);
            }}
          >
            Edit
          </Button>
        )}
        deleteAction={(record) => (
          <Button
            className="focus:bg-[unset]"
            onClick={() => {
              setDeleteID(record?.id);
              setDeleteModalShow(true);
            }}
          >
            Delete
          </Button>
        )}
      />
    </div>
  );
};

export default Brands;
