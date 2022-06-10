import { Input, Button } from 'components';

export const Products = () => {
  return (
    <>
      {/* <h6 className="text-white mb-[32px]">
        <Button className="w-full h-[52px]">New Message</Button>
      </h6> */}
      <div className="flex flex-col gap-[20px]">
        <Input
          name="userType"
          placeholder="Select User Type"
          type="select"
          label="User Type"
          options={[
            { label: 'Admins', value: 0 },
            { label: 'Clients', value: 1 },
          ]}
        />
        {/* <h6 className="text-white text-[16px] mb-[12px]">Targeted Clients</h6> */}
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
