import { Route, Routes } from 'react-router-dom';
import { CategoryList } from './pages';
import { ChildCategoryList } from './pages/ChildCategory';

const Categories = () => {
  return (
    <Routes>
      {/* <Route index element={<CategoryList />} /> */}
      <Route index element={<ChildCategoryList />} />
    </Routes>
  );
};

export default Categories;
