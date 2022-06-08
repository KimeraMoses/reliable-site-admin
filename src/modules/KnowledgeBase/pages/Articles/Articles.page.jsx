import { Route, Routes } from 'react-router-dom';
import { Add, List, View } from './pages';

const Articles = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="add/new" element={<Add />} />
      <Route path="article/view/:id" element={<View />} />
      {/* <Route path="article/edit/:id" element={< />} />  */}
    </Routes>
  );
};

export default Articles;
