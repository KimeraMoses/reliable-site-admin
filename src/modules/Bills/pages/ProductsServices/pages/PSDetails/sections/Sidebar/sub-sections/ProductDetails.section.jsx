import { Button, MultiSelect } from 'components';

export const ProductDetails = () => {
  return (
    <div className="p-[32px] bg-[#1E1E2D] rounded-[8px] mt-[20px]">
      <h6 className="text-white font-medium text-[16px]">ProductDetails</h6>
      <p className="text-[#474761] text-[14x] mt-[8px] mb-[32px]">
        Set Categories & Tags
      </p>
      <MultiSelect
        name="productCategories"
        placeholder="Select Categories"
        label="Cateogries"
        options={[
          { label: 'Pending', value: 0 },
          { label: 'Confirmed', value: 1 },
          { label: 'Canceled', value: 2 },
        ]}
      />
      <Button type="ghost" className="mt-[16px] mb-[32px] w-full h-[52px]">
        Add New Category
      </Button>
      <MultiSelect
        name="tags"
        placeholder="Enter New Tag"
        label="Tags"
        mode="tags"
      />
    </div>
  );
};
