import { DatePicker } from "components";

const fields = [
  { label: "Next Due Date", name: "nextDueDate" },
  { label: "Termination Date", name: "terminationDate" },
  { label: "Override Suspension Date", name: "overrideSuspensionDate" },
  { label: "Override Termination Date", name: "overrideTerminationDate" },
];

const DateTitle = ({ title, name, disabled }) => {
  return (
    <div>
      <label className="mb-[16px] text-white text-[14px] font-normal">
        {title}
      </label>
      <DatePicker
        name={name}
        hideTime
        format="MM/DD/YYYY"
        disabled={disabled}
      />
    </div>
  );
};

export const AdvancedSettings = () => {
  return (
    <div className="bg-[#1E1E2D] p-[32px] mt-[20px] rounded-[8px]">
      <h6 className="text-white text-[16px] font-medium mb-[32px]">
        Advanced Settings
      </h6>
      <div className="grid grid-cols-2 gap-[32px]">
        <div className="col-span-full">
          <DateTitle
            name="registrationDate"
            title="Registration Date"
            disabled
          />
        </div>
        {fields?.map((field) => {
          return (
            <DateTitle
              key={field.name}
              name={field.name}
              title={field.label}
              disabled
            />
          );
        })}
      </div>
      {/* <Button
        type="ghost"
        htmlType="submit"
        className="mt-[32px] h-[52px]"
        disabled
      >
        Save Changes
      </Button> */}
    </div>
  );
};
