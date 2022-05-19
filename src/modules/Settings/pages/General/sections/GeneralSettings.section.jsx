import { Formik, Form } from 'formik';
import { useCountries } from 'use-react-countries';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useEffect, useState } from 'react';

const initialValues = {
  dateFormat: 'DD/MM/YYYY',
  country: 'United States',
  termsOfService: 'https://www.reliablesite.com/termsofservice',
  termsOfServiceAgreement: true,
  recordsToDisplay: '10',
  autoRefreshInterval: '60',
  module1Settings: '',
  module2Settings: '',
};

const validationSchema = Yup.object().shape({
  dateFormat: Yup.string().required('This is a required field'),
});

export function GeneralSettings() {
  const [countriesData, setCountriesData] = useState([]);
  const { countries } = useCountries();

  useEffect(() => {
    const cArr = countries.map((country) => ({
      label: country?.name,
      value: country?.name,
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
    setCountriesData(cArr);
  }, [countries]);

  // Fields
  const fields = [
    {
      name: 'dateFormat',
      label: 'Date Format',
      type: 'select',
      options: [
        { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
        { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
      ],
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: countriesData,
    },
    {
      name: 'termsOfService',
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
        { label: '5', value: '5' },
        { label: '10', value: '10' },
      ],
    },
    {
      name: 'autoRefreshInterval',
      label: 'Auto Refresh Interval',
      type: 'select',
      options: [
        { label: '30 Seconds', value: '30' },
        { label: '60 Seconds', value: '60' },
        { label: '90 Seconds', value: '90' },
        { label: '120 Seconds', value: '120' },
      ],
    },
    {
      name: 'module1Settings',
      label: 'Module 1 Settings',
      type: 'select',
      options: [
        { label: 'Select Settings', value: 'select_settings' },
        { label: 'Select Settings 1', value: 'select_settings1' },
      ],
    },
    {
      name: 'module2Settings',
      label: 'Module 2 Settings',
      type: 'select',
      options: [
        { label: 'Select Settings', value: 'select_settings' },
        { label: 'Select Settings 1', value: 'select_settings1' },
      ],
    },
  ];

  return (
    <Card heading="General Settings">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
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
