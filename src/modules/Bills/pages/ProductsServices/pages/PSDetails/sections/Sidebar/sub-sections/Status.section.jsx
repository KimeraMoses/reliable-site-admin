import { Input } from 'components';

export const Status = () => {
  return (
    <div className="p-[32px] bg-[#1E1E2D] rounded-[8px] mt-[20px]">
      <div className="flex justify-between items-center">
        <h6 className="text-white font-medium text-[16px]">Status</h6>
        <div className="w-[11px] h-[11px] rounded-[50%] bg-[#0BB783]" />
      </div>
      <p className="text-[#474761] text-[14x] mt-[8px] mb-[32px]">
        Set The Product Status
      </p>
      <Input
        name="status"
        placeholder="Status"
        type="select"
        label="Status"
        className="mb-[20px]"
        options={[
          { label: 'Pending', value: 0 },
          { label: 'Confirmed', value: 1 },
          { label: 'Canceled', value: 2 },
        ]}
      />
      <Input
        name="paymentType"
        placeholder="Payment Type"
        type="select"
        label="Payment Type"
        options={[
          { label: 'One Time', value: 0 },
          { label: 'Monthly', value: 1 },
        ]}
      />
    </div>
  );
};
