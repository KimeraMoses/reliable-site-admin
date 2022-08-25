import { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { getClients, getUsers, getBrands } from "store";
import { checkModule } from "lib/checkModule";
import { Table } from "components";
import { AddClientUser, EditClientUser } from "./sections";

export const ClientList = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getClients());
      await dispatch(getUsers());
      await dispatch(getBrands());
    })();
  }, []);

  const { clients, loading } = useSelector((state) => state?.users);
  const brandsLoading = useSelector((state) => state?.brands?.loading);

  const { t } = useTranslation("/Bills/ns");
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Clients",
    modules: userModules,
  });
  const columns = [
    {
      title: "Client Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Created Date",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (date) => getFullDate(date),
    },
  ];

  const getFullDate = (date) => {
    const dateAndTime = date.split("T");

    return dateAndTime[0].split("-").reverse().join("-");
  };

  return (
    <div className="p-[40px]">
      <AddClientUser show={showAdd} setShow={setShowAdd} />
      <EditClientUser
        show={showEdit}
        setShow={setShowEdit}
        client={clientDetails}
      />
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          columns={columns}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            position: ["bottomLeft"],
            pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
          }}
          rowKey={(record) => record?.id}
          data={clients}
          loading={loading || brandsLoading}
          fieldToFilter="fullName"
          btnData={{
            text: "Add Client",
            onClick: () => setShowAdd(true),
            customClass: "px-[82px]",
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(
                  `/admin/dashboard/billing/clients/list/details/${record?.id}`
                );
              },
            };
          }}
          viewAction={(record) => (
            <Button
              onClick={() => {
                navigate(
                  `/admin/dashboard/billing/clients/list/details/${record?.id}`
                );
              }}
            >
              View
            </Button>
          )}
          editAction={(record) => (
            <>
              <Button
                onClick={() => {
                  setShowEdit(true);
                  setClientDetails(record);
                }}
              >
                Edit
              </Button>
              {/* <Button onClick={() => {}}>Login As Client</Button> */}
            </>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
