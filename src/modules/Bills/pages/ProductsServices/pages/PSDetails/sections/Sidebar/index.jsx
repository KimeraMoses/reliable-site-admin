import { ProductDetails, Status, Thumbnail } from './sub-sections';

export const Sidebar = () => {
  return (
    <div>
      <Thumbnail />
      <Status />
      <ProductDetails />
    </div>
  );
};
