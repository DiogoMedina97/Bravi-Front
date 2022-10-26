import { Route, Routes } from 'react-router-dom';

import { Create } from './create/Create';
import { List } from './list/List';
import { Update } from './update/Update';

export const PersonRouter = () => (
  <Routes>
    <Route path="/create" element={<Create />} />
    <Route path="/update/:id" element={<Update />} />
    <Route path="/" element={<List />} />
  </Routes>
);
