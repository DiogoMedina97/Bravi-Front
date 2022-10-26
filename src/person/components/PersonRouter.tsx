import { Route, Routes } from 'react-router-dom';

import { Create } from './create/Create';
import { List } from './list/List';

export const PersonRouter = () => (
  <Routes>
    <Route path="/create" element={<Create />} />
    <Route path="/" element={<List />} />
  </Routes>
);
