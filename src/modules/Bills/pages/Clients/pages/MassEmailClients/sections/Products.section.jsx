import { Input, MultiSelect, Button } from 'components';

export const Products = () => {
  return (
    <>
      <h6 className="text-white mb-[32px]">
        <Button className="w-full h-[52px]">New Message</Button>
      </h6>
      <div className="flex flex-col gap-[20px]">
        <h6 className="text-white text-[16px] mb-[12px]">
          Products & Services
        </h6>
        <MultiSelect
          name="products"
          placeholder="Select Products & Services"
          options={[
            { label: 'Product 1', value: 'product1' },
            { label: 'Product 2', value: 'product2' },
            { label: 'Product 3', value: 'product3' },
          ]}
        />
        <h6 className="text-white text-[16px] mb-[12px]">Targeted Clients</h6>
        <Input
          label="Property"
          type="select"
          name="property"
          placeholder="Select Property"
          options={[
            { label: 'Bills', value: 'bills' },
            { label: 'Bills2', value: 'bills2' },
          ]}
        />
        <Input
          label="Operator"
          type="select"
          name="operator"
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
          type="number"
          name="value"
          placeholder="Enter Value $"
        />
        <Button type="ghost" className="h-[52px] w-full">
          Apply
        </Button>
      </div>
    </>
  );
};
