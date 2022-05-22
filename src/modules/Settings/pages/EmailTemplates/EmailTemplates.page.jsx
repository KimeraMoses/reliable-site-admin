import { Route, Routes } from 'react-router-dom';
import { List, AddTemplate, EditTemplate } from './pages';

function EmailTemplates() {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="template/add" element={<AddTemplate />} />
      <Route path="edit/:id" element={<EditTemplate />} />
    </Routes>
  );
}

export default EmailTemplates;
