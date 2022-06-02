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
import { convertHTMLToDraftState } from 'lib';

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
    dispatch(getProductByID(id));
  }, []);
  return (
    <Formik
      initialValues={{
        preview: product?.base64Image,
        thumbnail: product?.base64Image,
        status: product?.status,
        productCategories: product?.productCategories,
        tags: product?.tags?.split(','),
        name: product?.name,
        description: product?.description,
        descriptionHolder: convertHTMLToDraftState(product?.headerContent),
        productLineItems: [
          {
            id: '1',
            name: 'Line Item 1',
            price: 100,
          },
          {
            id: '2',
            name: 'Line Item 2',
            price: 200,
          },
        ],
        notes: product?.notes,
        registrationDate: moment(product?.registrationDate),
        nextDueDate: moment(product?.nextDueDate),
        terminationDate: moment(product?.terminationDate),
        overrideSuspensionDate: moment(product?.overrideSuspensionDate),
        overrideTerminationDate: moment(product?.overrideTerminationDate),
      }}
      enableReinitialize
      onSubmit={(values) => console.log(values)}
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
