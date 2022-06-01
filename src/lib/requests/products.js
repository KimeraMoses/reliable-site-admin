// import { getConfig } from './getConfig';

// const Products = 'Products';
// const productsConfig = (action) => getConfig({ module: 'Users', action });

// Get all products
export const getProductsConfig = () => ({
  url: `http://localhost:5002/products`,
});
