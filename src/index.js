import {React} from 'react';
import { createRoot } from 'react-dom/client';
import { SummitCity } from './components/SummitCity';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <SummitCity />
  </BrowserRouter>
);


