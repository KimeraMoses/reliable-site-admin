import { Spin } from 'antd';
import { Input, MultiSelect, Button } from 'components';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllSMTPs } from 'store';
import { getProducts } from 'store';
import { findSpecificUsers } from 'store';

export const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state?.products);
  const { smtps } = useSelector((state) => state?.smtps);
  const { values } = useFormikContext();

  useEffect(() => {
    (async () => {
      await dispatch(getProducts());
      await dispatch(getAllSMTPs());
    })();
  }, []);

  console.log(values);

  return (
    <Spin spinning={loading}>
      {/* <h6 className="text-white mb-[32px]">
        <Button className="w-full h-[52px]">New Message</Button>
      </h6> */}
      <div className="flex flex-col gap-[20px]">
        <h6 className="text-white text-[16px] mb-[12px]">
          Products & Services
        </h6>
        <MultiSelect
          name="productIds"
          placeholder="Select Products & Services"
          options={products?.map((product) => ({
            label: product?.name,
            value: product?.id,
          }))}
        />
        <h6 className="text-white text-[16px] mb-[12px]">SMTP Configuration</h6>
        <Input
          type="select"
          name="smtpConfigId"
          placeholder="Select SMTP Configuration"
          options={smtps?.map((smtp) => ({
            label: smtp?.host,
            value: smtp?.id,
          }))}
        />
        <h6 className="text-white text-[16px] mb-[12px]">Targeted Clients</h6>
        <div className="flex flex-col gap-[20px]">
          <Input
            label="Property"
            type="select"
            name="property"
            placeholder="Select Property"
            options={[
              { label: 'Bills', value: 0 },
              { label: 'Tickets', value: 1 },
              { label: 'Orders', value: 2 },
              { label: 'Products', value: 3 },
              { label: 'Refunds', value: 4 },
            ]}
          />
          <Input
            label="Operator"
            type="select"
            name="operatorType"
            placeholder="Select Operator"
            options={[
              { label: '>=', value: '>=' },
              { label: '<=', value: '<=' },
              { label: '<', value: '<' },
              { label: '>', value: '>' },
              { label: '=', value: '=' },
              { label: '!=', value: '!=' },
            ]}
          />
          <Input
            label="Value"
            type="text"
            name="value"
            placeholder="Enter Value"
          />
          <Button
            type="ghost"
            className="h-[52px] w-full"
            htmlType="button"
            onClick={async () => {
              if (values?.property && values?.operatorType && values?.value) {
                const { property, operatorType, value } = values;
                await dispatch(
                  findSpecificUsers({
                    property: Number(property),
                    operatorType,
                    value,
                  })
                );
              } else {
                toast.error('Please select appropriate values to proceed.');
              }
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </Spin>
  );
};
