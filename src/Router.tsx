import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Navigate to="/person" replace />} />
    </Routes>
  </BrowserRouter>
);
