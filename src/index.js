import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './Context/LocationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
