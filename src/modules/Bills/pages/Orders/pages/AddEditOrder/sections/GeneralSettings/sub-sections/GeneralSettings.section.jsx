import { Button, Input } from "components";
import "./styles.scss";

export const GS = ({ isView }) => {
  return (
    <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
      <Input
        name="name"
        placeholder="Product Name"
        label="Product Name"
        className="mb-[20px]"
        disabled={isView}
      />
      <Input
        name="description"
        placeholder="Product Description"
        label="Product Description"
        type="textarea"
        rows={4}
        disabled={isView}
      />
      {!isView && (
        <Button type="ghost" className="h-[52px] mt-[32px]" htmlType="submit">
          Save Changes
        </Button>
      )}
    </div>
  );
};
