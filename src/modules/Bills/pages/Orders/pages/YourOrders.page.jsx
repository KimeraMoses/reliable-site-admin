import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "components";
import { statusList } from "lib";
import { checkModule } from "lib/checkModule";
import { getOrders } from "store";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// import { AddOrder } from "./sections/AddOrder.section";
import { getClients } from "store";
import { getProducts } from "store";
import { getOrderTemplates } from "store";
import { Button } from "antd";
import { Delete } from "modules/UserProfile/sections/APIKeys/sections";

export const YourOrders = ({ myOrders }) => {
  const navigate = useNavigate();
  // const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { t } = useTranslation("/Bills/ns");
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state?.orders);
  const { userModules } = useSelector((state) => state?.modules);
  const { user } = useSelector((state) => state?.auth);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    (async () => {
      await dispatch(getOrders());
      await dispatch(getOrderTemplates());
      await dispatch(getClients());
      await dispatch(getProducts());
    })();
  }, [dispatch]);

  // Setting data properly
  // const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  const { permissions } = checkModule({
    module: "Orders",
    modules: userModules,
  });

  const columns = [
    {
      title: t("orderId"),
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: t("client"),
      dataIndex: "clientFullName",
      key: "clientFullName",
      render: (fullName) => {
        // let name = "";
        // let userN = fullName?.split(" ");
        // if (userN?.length < 2) {
        //   name = userN?.[0]?.charAt(0);
        // } else {
        //   name = userN?.[0]?.charAt(0) + userN?.[1]?.charAt(0);
        // }
        // console.log(record);
        // const statusValue = statusList(record?.status);
        return (
          <div className="flex items-center gap-[12px]">
            {/* {record?.issueByImage ? (
              <img
                src={record?.userImagePath}
                alt="card"
                className="w-[32px] h-[20px] object-cover rounded-[4px]"
              />
            ) : (
              <div
                className={`bg-[${statusValue.bg}] px-[8px] py-[4px]  text-[${statusValue.text}] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center`}
              >
                {name}
              </div>
            )} */}
            <p className="text-white">{fullName ? fullName : "N/A"}</p>
          </div>
        );
      },
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusValue = statusList(status);
        return (
          <div
            className={`bg-[${statusValue.bg}] px-[8px] py-[4px] text-[${statusValue.text}] w-[fit-content] rounded-[4px]`}
          >
            {statusValue.name}
          </div>
        );
      },
    },
    {
      title: t("total"),
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => {
        return <>{`${totalPrice} USD`}</>;
      },
    },
    {
      title: t("dateAdded"),
      dataIndex: "createdOn",
      key: "createdOn",
      render: (createdOn) => moment(createdOn).format("DD-MM-YYYY"),
    },
    {
      title: t("dateModified"),
      dataIndex: "lastModifiedOn",
      key: "lastModifiedOn",
      render: (lastModifiedOn) => moment(lastModifiedOn).format("DD-MM-YYYY"),
    },
  ];

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        {/* <AddOrder show={showAdd} setShow={setShowAdd} record={record} /> */}
        <Delete
          show={showDelete}
          setShow={setShowDelete}
          record={record}
          type="order"
        />
        <Table
          columns={columns}
          data={
            myOrders
              ? orders?.filter((order) => order?.adminAssigned === user?.id)
              : orders?.filter((order) => order?.adminAssigned !== user?.id)
          }
          // loading={loading}
          // dateRageFilter={true}
          // statusFilter={statusList()}
          // hideActions
          fieldToFilter="orderNo"
          btnData={
            !myOrders
              ? {
                  text: "Add Order",
                  onClick: () =>
                    navigate(
                      `/admin/dashboard/billing/orders/${
                        myOrders ? "your-orders" : "all-orders"
                      }/list/add/new`
                    ),
                }
              : null
          }
          viewAction={(record) => (
            <Button
              onClick={() => {
                navigate(
                  `/admin/dashboard/billing/orders/${
                    myOrders ? "your-orders" : "all-orders"
                  }/list/edit/${record?.id}`
                );
              }}
            >
              View/Edit
            </Button>
          )}
          deleteAction={(record) => (
            <>
              <Button
                onClick={() => {
                  setRecord(record);
                  setShowDelete(true);
                }}
              >
                Delete
              </Button>
            </>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
