import { Input } from "components";
import { useSelector } from "react-redux";
import { SearchableField } from ".";

export const Status = () => {
  const { clients } = useSelector((state) => state?.users);

  return (
    <div className="p-[32px] bg-[#1E1E2D] rounded-[8px]">
      {/* <div className="flex justify-between items-center">
        <h6 className="text-white font-medium text-[16px]">Status</h6>
      </div>
      <p className="text-[#474761] text-[14x] mt-[8px] mb-[32px]">
        Set The Product Status
      </p> */}
      <SearchableField
        name="assignedToClientId"
        placeholder="Search client"
        label="Client"
        data={clients}
      />
      {/* <Input
        name="status"
        placeholder="Status"
        type="select"
        label="Status"
        className="mb-[20px]"
        options={[
          { label: "Draft", value: 0 },
          { label: "Pending", value: 1 },
        ]}
      /> */}
      <Input
        name="paymentType"
        placeholder="Payment Type"
        type="select"
        label="Payment Type"
        className="mb-[20px]"
        options={[
          { label: "One Time", value: 0 },
          { label: "Recurring", value: 1 },
        ]}
      />
      <Input
        name="billingCycle"
        placeholder="Billing Cycle"
        type="select"
        label="Billing Cycle"
        options={[
          { label: "Hourly", value: 0 },
          { label: "Monthly", value: 1 },
          { label: "Quarterly", value: 2 },
          { label: "SemiAnnually", value: 3 },
          { label: "Annually", value: 4 },
          { label: "Biennially", value: 5 },
          { label: "Triennially", value: 6 },
        ]}
      />
    </div>
  );
};
