import { Button } from 'antd';
import { Table } from 'components';
import { checkModule } from 'lib/checkModule';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getUsers } from 'store';
import { useTranslation } from "react-i18next";
import {
  AddBrand,
  DeleteBrand,
  EditBrand,
  ClientsAssigned,
} from './sections';
import { NavLink } from 'react-router-dom';

const Brands = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [clientsValue, setClientsValue] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [clientsModalShow, setClientsModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getBrands());
      await dispatch(getUsers());
    })();
  }, [dispatch]);

  const { brands, loading } = useSelector((state) => state.brands);
  const { users } = useSelector((state) => state?.users);

  const { t } = useTranslation("/Brands/ns");

  const handleClientsAssigned = (clientAssigned) => {
    let a = brands?.filter(function (el) { return el.clientAssigned == clientAssigned });
    console.log(brands);
    //setClientsValue(clientAssigned);
    // setClientsModalShow(true);
  }

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
      render: (logoUrl, record) => {
        let name = '';
          let userN = record.name.split(' ');
          if (userN.length < 2) {
            name = userN[0].charAt(0);
          } else {
            name = userN[0].charAt(0) + userN[1].charAt(0);
          }
        return (
          logoUrl ? (
            <img
              src={logoUrl}
              alt={logoUrl}
              className="h-full w-full rounded-[5px] object-cover text-[8px]"
            />
          ) : (
            <div className="bg-[#1C3238] px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
              {name}
            </div>
          )
        )
      }
    },
    {
      title: t('clientAssignedTable'),
      key: "clientAssigned",
      dataIndex: "clientAssigned",
      onCell: (record, rowIndex) => {
        return {
          onClick: (ev) => {
            setEditValue(record);
            setClientsModalShow(true);
          },
        };
      },
      render: (clientAssigned) => {
        return (
          <NavLink to={"#"}>
            {`${clientAssigned?.split(",")?.length} Clients Assigned`}
          </NavLink>
        )
      }
    },
    {
      title: t('status'),
      key: "status",
      dataIndex: "status",
      render: (status) =>
        status ? (
          <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#0BB783] w-[fit-content] rounded-[4px]">
            {"ENABLED"}
          </div>
        ) : (
          <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#F64E60] w-[fit-content] rounded-[4px]">
            {"DISABLED"}
          </div>
        ),
    },
  ];


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
          key: b?.id
        };
      });
      setData(dataToSet);
    }
  }, [brands]);

  return (
    <div className="brands-table m-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
      <AddBrand show={addModalShow} setShow={setAddModalShow} users={users} />
      <EditBrand
        show={editModalShow}
        setShow={setEditModalShow}
        editValue={editValue}
        users={users}
      />
      <ClientsAssigned
        show={clientsModalShow}
        setShow={setClientsModalShow}
        editValue={editValue}
        users={users}
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
