import { Input, Button } from 'components';

export const Products = () => {
  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <Input
          name="userType"
          placeholder="Select User Type"
          type="select"
          label="User Type"
          options={[
            { label: 'Admins', value: 1 },
            { label: 'Clients', value: 0 },
          ]}
        />
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
          placeholder="Enter Value"
        />
        <Button type="ghost" className="h-[52px] w-full">
          Apply
        </Button>
      </div>
    </>
  );
};
