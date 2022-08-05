import { ProductDetails, Status, Thumbnail } from "./sub-sections";

export const Sidebar = ({ defaulValue }) => {
  return (
    <div>
      <Thumbnail />
      <Status defaulValue={defaulValue} />
      <ProductDetails />
    </div>
  );
};
