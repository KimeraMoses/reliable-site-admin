import { getConfig } from './getConfig';

// const Products = 'Products';
const productsConfig = (action) => getConfig({ module: 'Users', action });
const prefix = 'api/v1/admin/products';

// Get all products
export const getProductsConfig = () => ({
  url: `${prefix}/search`,
  config: productsConfig('View'),
});

// Get Product by ID
export const getProductsByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: productsConfig('View'),
});

// Update Product by ID
export const updateProductByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: productsConfig('Update'),
});

// Create a Product
export const createProductConfig = () => ({
  url: `${prefix}`,
  config: productsConfig('Create'),
});

// Delete Product by ID
export const deleteProductByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: productsConfig('Delete'),
});
