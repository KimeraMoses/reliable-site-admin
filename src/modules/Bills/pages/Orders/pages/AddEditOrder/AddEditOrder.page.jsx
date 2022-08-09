import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { Sidebar, GeneralSettings } from "./sections";
import "./AddEditOrder.styles.scss";
import { createServerImage } from "lib";
import {
  getCategories,
  createOrder,
  // editOrderTemplateByID,
  getOrderTemplate,
  getOrderTemplates,
  getDepartments,
  getOrderTemplateByID,
} from "store";
import { getOrderDetails } from "store";

export const AddEditOrder = () => {
  // const [active, setActive] = useState('GENERAL SETTINGS');

  // const links = [
  //   { label: 'GENERAL SETTINGS', onClick: () => setActive('GENERAL SETTINGS') },
  //   {
  //     label: 'ADVANCED SETTINGS',
  //     onClick: () => setActive('ADVANCED SETTINGS'),
  //   },
  // ];

  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state?.orders);
  const categoriesLoading = useSelector((state) => state?.categories?.loading);
  const usersLoading = useSelector((state) => state?.users?.loading);
  const departmentsLoading = useSelector(
    (state) => state?.departments?.loading
  );

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      // console.log(id);
      await dispatch(getCategories());
      if (id) {
        dispatch(getOrderDetails(id));
      } else if (!id) {
        dispatch(getOrderTemplate(null));
      }
      await dispatch(getDepartments());
      await dispatch(getOrderTemplates());
    })();
  }, []);

  const initVal = {
    preview: order ? order?.products[0]?.base64Image : "",
    isActive: true,
    name: order ? order?.products[0]?.name : "",
    description: order ? order?.products[0]?.description : "",
    // summary: order ? order?.products[0]?.summary : '',
    thumbnail: order ? order?.products[0]?.thumbnail : "",
    status: order ? order?.products[0]?.status : 0,
    productCategories: order
      ? order?.products[0]?.productCategories?.map((category) => category?.id)
      : [],
    productDepartments: order
      ? order?.products[0]?.productDepartments?.map(
          (department) => department?.id
        )
      : [],
    productLineItems: order
      ? order?.product[0]?.productLineItems?.map((item) => ({
          ...item,
          isDeleted: item?.isDeleted || false,
        }))
      : [],
    tags: order ? order?.products[0]?.tags?.split(",") : [],
    paymentType: order ? order?.products[0]?.paymentType : 0,
    billingCycle: order ? order?.products[0]?.billingCycle : 0,
    notes: order ? order?.products[0]?.notes : "",
    registrationDate: order
      ? moment(order?.products[0]?.registrationDate)
      : moment(),
    nextDueDate: order
      ? moment(order?.products[0]?.registrationDate)
      : moment(),
    terminationDate: order
      ? moment(order?.products[0]?.registrationDate)
      : moment(),
    overrideSuspensionDate: order
      ? moment(order?.products[0]?.registrationDate)
      : moment(),
    overrideTerminationDate: order
      ? moment(order?.products[0]?.registrationDate)
      : moment(),
    adminAssigned: order ? order?.adminAssigned : "",
    orderForClientId: order ? order?.orderForClientId : "",
    assignedToClientId: order ? order?.assignedToClientId : "",
    orderNotes: order ? order?.notes : "",
    orderTenant: order ? order?.tenant : "admin",
  };

  const { user } = useSelector((state) => state?.auth);

  return (
    <Formik
      initialValues={initVal}
      enableReinitialize
      onSubmit={async (values, { resetForm }) => {
        const img = await createServerImage(values.thumbnail);
        const newValues = {
          products: [
            {
              name: values.name,
              description: values.description,
              thumbnail: img,
              productCategories: values?.orderTemplateCategories,
              // productCategories: values?.productCategories?.map(
              //   (category) => category?.id
              // ),
              // productCategories: id
              //   ? values?.productCategories?.map((category) => ({
              //       // categoryId: category,
              //       category,
              //     }))
              //   : values?.productCategories?.map((category) => category?.id),
              // productDepartments: values?.productDepartments?.map(
              //   (department) => department?.id
              // ),
              productDepartments: values?.orderTemplateDepartments,
              // productDepartments: id
              //   ? values?.productDepartments?.map((department) => ({
              //       department,
              //     }))
              //   : values?.productDepartments?.map(
              //       (department) => department?.id
              //     ),
              productLineItems: values.productLineItems?.map((item) => {
                if (id) {
                  if (item?.isNew) {
                    return {
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  } else {
                    return {
                      // id: item?.isNew ? "" : item?.id,
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  }
                } else {
                  if (item?.isNew) {
                    return {
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  } else {
                    return {
                      id: item?.isNew ? "" : item?.id,
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  }
                }
              }),
              status: Number(values.status),
              tags: `${values?.tags}`,
              paymentType: Number(values.paymentType),
              billingCycle: Number(values.billingCycle),
              notes: values?.notes,
              registrationDate: moment(values?.registrationDate)?.toISOString(),
              nextDueDate: moment(values?.nextDueDate)?.toISOString(),
              terminationDate: moment(values?.terminationDate)?.toISOString(),
              overrideSuspensionDate: moment(
                values?.overrideSuspensionDate
              )?.toISOString(),
              overrideTerminationDate: moment(
                values?.overrideTerminationDate
              )?.toISOString(),
            },
          ],
          adminAssigned: order ? order?.adminAssigned : user?.id,
          orderForClientId: values.assignedToClientId,
          orderStatus: values?.status ? Number(values?.status) : 0,
          orderNotes: order ? order?.notes : "",
          tenant: "admin",
        };
        if (id) {
          // await dispatch(editOrderTemplateByID(id, newValues));
        } else {
          await dispatch(createOrder({ data: newValues }));
          // await dispatch(createOrderTemplate({ data: newValues }));
        }
        // resetForm();
        // navigate('/admin/dashboard/billing/orders/order-templates/list');
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="users">
              <div className="admin-details min-w-[60vh]">
                {loading ||
                categoriesLoading ||
                usersLoading ||
                departmentsLoading ? (
                  <Spin
                    size="large"
                    style={{ gridColumn: "1/3", alignSelf: "center" }}
                  />
                ) : (
                  <>
                    <div className="admin-details__left">
                      {/* THUMBNAIL + STATUS + PRODUCT DETAILS */}
                      <Sidebar />
                    </div>
                    <div className="admin-details__right">
                      {/* <Navigation active={active} links={links} /> */}
                      {/* {active === 'GENERAL SETTINGS' ? ( */}
                      <GeneralSettings />
                      {/* ) : (
                        <></>
                      )} */}
                      {/* {active === 'ADVANCED SETTINGS' ? (
                        <AdvancedSettings />
                      ) : (
                        <></>
                      )} */}
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
