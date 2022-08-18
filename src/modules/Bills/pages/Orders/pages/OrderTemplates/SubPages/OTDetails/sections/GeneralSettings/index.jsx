import { Button } from "components";
import { useNavigate } from "react-router-dom";
import { GS, LineItems } from "./sub-sections";

export const GeneralSettings = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GS />
      <LineItems />
      <div className="flex justify-between text-right ">
        <Button
          type="secondary"
          className="h-[52px] mt-[32px]"
          htmlType="button"
          onClick={() =>
            navigate("/admin/dashboard/billing/orders/order-templates/list")
          }
        >
          Cancel Changes
        </Button>
        <Button type="ghost" className="h-[52px] mt-[32px]" htmlType="submit">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
