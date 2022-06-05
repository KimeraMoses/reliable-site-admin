import { Route, Routes } from 'react-router-dom';
import { List } from './pages';

const Articles = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      {/* <Route path="article/view/:id" element={<ClientDetails />} />
      <Route path="article/add/new" element={<ClientDetails />} />
      <Route path="article/edit/:id" element={<ClientDetails />} /> */}
    </Routes>
  );
};

export default Articles;
