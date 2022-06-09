import Clients from './Articles/Articles.page';
import UserSubmissions from './UserSubmissions/UserSubmissions.page';
import Feedback from './Feedback/Feedback.page';
import Categories from './Categories/Categories.page';

export const pages = [
  { path: '/articles/*', Component: Clients },
  { path: '/user-submissions/*', Component: UserSubmissions },
  { path: '/feedback/*', Component: Feedback },
  { path: '/categories/*', Component: Categories },
];
