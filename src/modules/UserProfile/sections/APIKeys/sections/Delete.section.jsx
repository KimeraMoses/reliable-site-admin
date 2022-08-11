import { Modal } from "components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOrderByID } from "store";
import { deleteAPIKey } from "store";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
});

export const Delete = ({ show, setShow, id, type, record }) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <Modal
      heading={`Delete ${type === "order" ? "Order" : "API Key"}`}
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this{" "}
          {type === "order" ? "Order" : "API Key"}? This action is permanent and
          can not be undone.
        </div>
      }
      initialValues={{ id: record?.id }}
      validationSchema={validationSchema}
      submitText={`Delete ${type === "order" ? "Order" : "API Key"}`}
      loading={loading}
      handleSubmit={async (values) => {
        setIsLoading(true);
        await dispatch(
          type === "order"
            ? deleteOrderByID(values?.id)
            : deleteAPIKey(values?.id)
        );
        setIsLoading(false);
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};
