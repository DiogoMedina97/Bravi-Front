import Container from 'react-bootstrap/Container';

import './App.scss';
import { Router } from './Router';

export const App = () => (
  <Container>
    <h1 className="my-3">Bravi</h1>
    <Router />
  </Container>
);
