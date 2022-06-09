import { Route, Routes } from 'react-router-dom';
import { Add, Edit, List, View } from './pages';

const Articles = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="add/new" element={<Add />} />
      <Route path="view/:id" element={<View />} />
      <Route path="edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default Articles;
