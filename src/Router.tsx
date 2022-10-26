import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { PersonRouter } from './person/components/PersonRouter';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="person/*" element={<PersonRouter />} />
      <Route path="/*" element={<Navigate to="/person" replace />} />
    </Routes>
  </BrowserRouter>
);
