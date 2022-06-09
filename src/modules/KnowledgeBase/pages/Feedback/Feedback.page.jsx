import { Route, Routes } from 'react-router-dom';
import { FeedbackDetails, List } from './pages';

const Feedback = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="view/:id" element={<FeedbackDetails />} />
    </Routes>
  );
};

export default Feedback;
