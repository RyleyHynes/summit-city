import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import { SummitCity } from './components/SummitCity';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <SummitCity />
  </BrowserRouter>
);


