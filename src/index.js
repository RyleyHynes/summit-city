import 'bootstrap/dist/css/bootstrap.css';
import './custom.scss';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SummitCity } from './SummitCity';
import "./index.css"


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <SummitCity />
  </BrowserRouter>
);

