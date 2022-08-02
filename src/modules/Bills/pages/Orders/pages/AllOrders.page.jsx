import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "components";
import { checkModule } from "lib/checkModule";
import { NavLink } from "react-router-dom";
import { ViewNotes } from "./sections";
import { getOrderTemplates } from "store";
import moment from "moment";
import { OrderTemplate } from "./sections/OrderTemplate.section";
import { EditOrderTemplate } from "./sections/EditTemplate.section";
import { Button } from "antd";

export const AllOrders = () => {
  const { t } = useTranslation("/Bills/ns");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getOrderTemplates());
    })();
  }, [dispatch]);

  // Setting data properly
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState("");
  const [noteModalShow, setNoteModalShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [orderTemplate, setOrderTemplate] = useState(null);

  const { orderTemplates, loading } = useSelector((state) => state?.orders);
  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: "Orders",
    modules: userModules,
  });

  useEffect(() => {
    setData([]);
    if (orderTemplates.length) {
      const dataToSet = orderTemplates.map((b) => {
        return {
          ...b,
          key: b?.id,
        };
      });
      setData(dataToSet);
    }
  }, [orderTemplates]);



  const columns = [
    {
      title: "Template Name",
      dataIndex: "templateName",
      key: "templateName",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text) => moment(text).format("MM/DD/YYYY"),
    },
    {
      title: "Last Modified On",
      dataIndex: "lastModifiedOn",
      key: "lastModifiedOn",
      render: (text) => moment(text).format("MM/DD/YYYY"),
    },
    {
      title: t("orderNotes"),
      dataIndex: "notes",
      key: "notes",
      render: (notes, record) => {
        return (
          <NavLink
            to="#"
            onClick={() => {
              setNotes(record);
              setNoteModalShow(true);
            }}
            className="text-uppercase"
          >
            {t("viewNotes")}
          </NavLink>
        );
      },
    },
  ];

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <ViewNotes
          show={noteModalShow}
          setShow={setNoteModalShow}
          notesValue={notes}
        />
        <OrderTemplate show={showAdd} setShow={setShowAdd} />
        <EditOrderTemplate
          show={showEdit}
          setShow={setShowEdit}
          orderTemplate={orderTemplate}
        />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          fieldToFilter="templateName"
          permissions={permissions}
          editAction={(record) => {
            return (
              <Button
                htmlType="button"
                onClick={() => {
                  setOrderTemplate(record);
                  setShowEdit(true);
                }}
              >
                Edit
              </Button>
            );
          }}
          btnData={{
            text: "Add Template",
            onClick: () => {
              setShowAdd(true);
            },
          }}
          t={t}
        />
      </div>
    </div>
  );
};
