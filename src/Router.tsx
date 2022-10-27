import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';

import { PersonRouter } from './person/components/PersonRouter';

export const Router = () => (
  <BrowserRouter>
    <Link to="/">
      <h1 className="my-3">Bravi</h1>
    </Link>
    <Routes>
      <Route path="person/*" element={<PersonRouter />} />
      <Route path="/*" element={<Navigate to="/person" replace />} />
    </Routes>
  </BrowserRouter>
);
