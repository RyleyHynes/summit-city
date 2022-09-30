import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SummitCity } from './components/SummitCity';
import './index.css';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <SummitCity />
  </BrowserRouter>
);


//Pass a function if you want to measure performance in your app
//For example to log results use (reportWebVitals(console.log))
//you can also send to an analytics endpoint. learn more: https://bit.lyCRA-vitals
//reportWebVitals()
