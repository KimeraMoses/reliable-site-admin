import { Formik, Form } from 'formik';
import { useCountries } from 'use-react-countries';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deepEqual } from 'lib';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  dateFormat: Yup.string().required('This is a required field'),
});

export function GeneralSettings() {
  const [countriesData, setCountriesData] = useState([]);
  const { countries } = useCountries();

  useEffect(() => {
    const cArr = countries.map((defaultCountry) => ({
      label: defaultCountry?.name,
      value: defaultCountry?.name,
    }));
    cArr.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
    const finalValues = [
      ...cArr,
      // TODO: Remove after updating to available countries
      { label: 'Canada1', value: 'CAD' },
      { label: 'Other', value: 'Other' },
    ];
    setCountriesData(finalValues);
  }, [countries]);

  // Fields
  const fields = [
    {
      name: 'dateFormat',
      label: 'Date Format',
      type: 'select',
      options: [
        { label: 'MM/DD/YYYY HH:mm:ss', value: 'MM/DD/YYYY HH:mm:ss' },
        { label: 'MM/DD/YYYY HH:mm:ss A', value: 'MM/DD/YYYY HH:mm:ss A' },
        { label: 'MM/dd/yyyy hh:mm t', value: 'MM/dd/yyyy hh:mm t' },
      ],
    },
    {
      name: 'defaultCountry',
      label: 'Country',
      type: 'select',
      options: countriesData,
    },
    {
      name: 'termsOfServiceURL',
      label: 'Terms of Service',
      type: 'text',
    },
    {
      name: 'termsOfServiceAgreement',
      label: 'Terms of Service Agreement',
      type: 'switch',
    },
    {
      name: 'recordsToDisplay',
      label: 'Records To Display',
      type: 'select',
      options: [
        { label: '05', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '30', value: 30 },
      ],
    },
    {
      name: 'autoRefreshInterval',
      label: 'Auto Refresh Interval',
      type: 'select',
      options: [
        { label: '05 Seconds', value: 5 },
        { label: '10 Seconds', value: 10 },
        { label: '20 Seconds', value: 20 },
        { label: '30 Seconds', value: 30 },
        { label: '60 Seconds', value: 60 },
        { label: '90 Seconds', value: 90 },
        { label: '120 Seconds', value: 120 },
      ],
    },
    // {
    //   name: 'module1Settings',
    //   label: 'Module 1 Settings',
    //   type: 'select',
    //   options: [
    //     { label: 'Select Settings', value: 'select_settings' },
    //     { label: 'Select Settings 1', value: 'select_settings1' },
    //   ],
    // },
    // {
    //   name: 'module2Settings',
    //   label: 'Module 2 Settings',
    //   type: 'select',
    //   options: [
    //     { label: 'Select Settings', value: 'select_settings' },
    //     { label: 'Select Settings 1', value: 'select_settings1' },
    //   ],
    // },
  ];

  const { settings } = useSelector((state) => state?.appSettings);
  const initialValues = {
    dateFormat: settings?.dateFormat,
    defaultCountry: settings?.defaultCountry,
    termsOfServiceURL: settings?.termsOfServiceURL,
    termsOfServiceAgreement: settings?.termsOfServiceAgreement,
    recordsToDisplay: settings?.recordsToDisplay,
    autoRefreshInterval: settings?.autoRefreshInterval,
    // module1Settings: '',
    // module2Settings: '',
  };

  return (
    <Card heading="General Settings">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (deepEqual(values, initialValues)) {
            toast.info('No changes were made');
          } else {
            console.log(values);
          }
        }}
        enableReinitialize
      >
        <Form>
          <div className="grid grid-cols-4 gap-[20px] mb-[32px]">
            {fields.map((field) => (
              <Input
                key={field.name}
                name={field.name}
                label={field?.label}
                placeholder={field.placeholder}
                type={field.type}
                options={field.options}
              />
            ))}
          </div>
          <Button htmlType="submit" type="ghost" className="px-[32px] h-[52px]">
            Save Changes
          </Button>
        </Form>
      </Formik>
    </Card>
  );
}
