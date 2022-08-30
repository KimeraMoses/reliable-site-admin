import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";

import { getProductByID } from "store";
import {
  Navigation,
  Sidebar,
  GeneralSettings,
  AdvancedSettings,
} from "./sections";
import "./PSDetails.styles.scss";
// import { createServerImage } from "lib";
import { getCategories } from "store";
import { updateProductByID } from "store";
import { getClients } from "store";
import { getDepartments } from "store";

export const PSDetails = () => {
  const [active, setActive] = useState("GENERAL SETTINGS");

  const links = [
    { label: "GENERAL SETTINGS", onClick: () => setActive("GENERAL SETTINGS") },
    {
      label: "ADVANCED SETTINGS",
      onClick: () => setActive("ADVANCED SETTINGS"),
    },
  ];

  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state?.products);
  const categoriesLoading = useSelector((state) => state?.categories?.loading);
  const usersLoading = useSelector((state) => state?.users?.loading);
  const departmentsLoading = useSelector(
    (state) => state?.departments?.loading
  );

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(getCategories());
      await dispatch(getProductByID(id));
      await dispatch(getClients());
      await dispatch(getDepartments());
    })();
  }, []);
  const initVal = {
    preview: product?.base64Image,
    thumbnail: product?.thumbnail,
    status: product?.status,
    productDepartments: product?.productDepartments?.map(
      (department) => department?.departmentId
    ),
    productCategories: product?.productCategories?.map(
      (category) => category?.categoryId
    ),
    tags: product?.tags?.split(","),
    name: product?.name,
    description: product?.description,
    // descriptionHolder: convertHTMLToDraftState(product?.headerContent),
    productLineItems: product?.productLineItems?.map((item) => ({
      ...item,
      isDeleted: item?.isDeleted || false,
    })),
    notes: product?.notes,
    paymentType: product?.paymentType,
    registrationDate: moment(product?.registrationDate),
    nextDueDate: moment(product?.nextDueDate),
    terminationDate: moment(product?.terminationDate),
    overrideSuspensionDate: moment(product?.overrideSuspensionDate),
    overrideTerminationDate: moment(product?.overrideTerminationDate),
    assignedToClientId: product?.assignedClient,
    billingCycle: product?.billingCycle,
  };

  return (
    <Formik
      initialValues={initVal}
      enableReinitialize
      onSubmit={async (values) => {
        // const img = await createServerImage(values.thumbnail);
        const newValues = {
          // thumbnail: img,
          // status: Number(values?.status),
          // productCategories: values?.productCategories?.map((item) => ({
          //   categoryId: item,
          // })),
          // productDepartments: values?.productDepartments?.map((item) => ({
          //   departmentId: item,
          // })),
          // paymentType: Number(values?.paymentType),
          // billingCycle: Number(values?.billingCycle),
          // tags: `${values?.tags}`,
          // name: values?.name,
          // description: values?.description,
          // productLineItems: values?.productLineItems?.map((item) => ({
          //   id: item?.id,
          //   lineItem: item?.lineItem,
          //   price: item?.price,
          //   isDeleted: item?.isDeleted,
          //   priceType: item?.priceType,
          // })),
          // notes: values?.notes,
          // registrationDate: values?.registrationDate?.toISOString(),
          // nextDueDate: values?.nextDueDate?.toISOString(),
          // terminationDate: values?.terminationDate?.toISOString(),
          overrideSuspensionDate: values?.overrideSuspensionDate?.toISOString(),
          overrideTerminationDate:
            values?.overrideTerminationDate?.toISOString(),
        };
        await dispatch(updateProductByID(id, newValues));
        // console.log(newValues);
      }}
    >
      {() => {
        // console.log("Form values", values);
        return (
          <Form>
            <div className="users">
              <div className="admin-details min-w-[60vh]">
                {loading ||
                categoriesLoading ||
                usersLoading ||
                departmentsLoading ||
                product === null ? (
                  <Spin
                    size="large"
                    style={{ gridColumn: "1/3", alignSelf: "center" }}
                  />
                ) : (
                  <>
                    <div className="admin-details__left">
                      {/* THUMBNAIL + STATUS + PRODUCT DETAILS */}
                      <Sidebar defaulValue={initVal?.assignedToClientId} />
                    </div>
                    <div className="admin-details__right">
                      <Navigation active={active} links={links} />
                      {active === "GENERAL SETTINGS" ? (
                        <GeneralSettings />
                      ) : (
                        <></>
                      )}
                      {active === "ADVANCED SETTINGS" ? (
                        <AdvancedSettings />
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
