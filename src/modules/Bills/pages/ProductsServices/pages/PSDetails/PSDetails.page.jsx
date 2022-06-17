import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { getProductByID } from 'store';
import {
  Navigation,
  Sidebar,
  GeneralSettings,
  AdvancedSettings,
} from './sections';
import './PSDetails.styles.scss';
import { convertHTMLToDraftState, createServerImage } from 'lib';
import { getCategories } from 'store';
import { updateProductByID } from 'store';

export const PSDetails = () => {
  const [active, setActive] = useState('GENERAL SETTINGS');

  const links = [
    { label: 'GENERAL SETTINGS', onClick: () => setActive('GENERAL SETTINGS') },
    {
      label: 'ADVANCED SETTINGS',
      onClick: () => setActive('ADVANCED SETTINGS'),
    },
  ];

  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state?.products);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(getCategories());
      await dispatch(getProductByID(id));
    })();
  }, []);

  const initVal = {
    preview: product?.base64Image,
    thumbnail: product?.thumbnail,
    status: product?.status,
    // TODO: Add departments once merged with task-116
    productDepartments: product?.productDepartments?.map(
      (department) => department?.departmentId
    ),
    productCategories: product?.productCategories?.map(
      (category) => category?.categoryId
    ),
    tags: product?.tags?.split(','),
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
  };

  return (
    <Formik
      initialValues={initVal}
      enableReinitialize
      onSubmit={async (values) => {
        const img = await createServerImage(values.thumbnail);
        const newValues = {
          thumbnail: img,
          status: values?.status,
          productCategories: values?.productCategories?.map((item) => ({
            categoryId: item,
          })),
          paymentType: values?.paymentType,
          tags: `${values?.tags}`,
          name: values?.name,
          description: values?.description,
          productLineItems: values?.productLineItems?.map((item) => ({
            name: item?.name,
            price: item?.price,
            isDeleted: item?.isDeleted,
          })),
          notes: values?.notes,
          registrationDate: values?.registrationDate?.toISOString(),
          nextDueDate: values?.nextDueDate?.toISOString(),
          terminationDate: values?.terminationDate?.toISOString(),
          overrideSuspensionDate: values?.overrideSuspensionDate?.toISOString(),
          overrideTerminationDate:
            values?.overrideTerminationDate?.toISOString(),
          productDepartments: values?.productDepartments,
        };
        await dispatch(updateProductByID(id, newValues));
        // console.log(newValues);
      }}
    >
      {({ values }) => {
        // console.log(values);
        return (
          <Form>
            <div className="users">
              <div className="admin-details min-w-[60vh]">
                {loading || product === null ? (
                  <Spin
                    size="large"
                    style={{ gridColumn: '1/3', alignSelf: 'center' }}
                  />
                ) : (
                  <>
                    <div className="admin-details__left">
                      {/* THUMBNAIL + STATUS + PRODUCT DETAILS */}
                      <Sidebar />
                    </div>
                    <div className="admin-details__right">
                      <Navigation active={active} links={links} />
                      {active === 'GENERAL SETTINGS' ? (
                        <GeneralSettings />
                      ) : (
                        <></>
                      )}
                      {active === 'ADVANCED SETTINGS' ? (
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
