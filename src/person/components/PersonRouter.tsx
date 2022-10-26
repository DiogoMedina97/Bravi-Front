import { Route, Routes } from 'react-router-dom';

import { List } from './list/List';

export const PersonRouter = () => (
  <Routes>
    <Route path="/" element={<List />} />
  </Routes>
);
